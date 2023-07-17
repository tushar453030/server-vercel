const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", (req, res) => {
  // stripe.charges.create(
  //   {
  //     source: req.body.tokenId,
  //     amount: req.body.amount,
  //     currency: "usd",
  //   },
  //   (stripeErr, stripeRes) => {
  //     if (stripeErr) {
  //       res.status(500).json(stripeErr);
  //     } else {
  //       res.status(200).json(stripeRes);
  //     }
  //   }
  // );

  stripe.paymentIntents.create(
    {
      payment_method_types: ['card'],
      amount: req.body.amount,
      currency: 'usd',
      payment_method_data: {
        type: 'card',
        card: {
          token: req.body.tokenId,
        },
      },
    },
    (stripeErr, paymentIntent) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(paymentIntent);
      }
    }
  );
  
});

module.exports = router;