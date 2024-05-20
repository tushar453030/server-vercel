const express = require('express')
const nodemailer = require('nodemailer')
const router = express.Router()

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service
  auth: {
    user: process.env.GMAILID, // Your email
    pass: process.env.PASS_GMAIL, // Your email password or an app-specific password if using Gmail
  },
})

router.post('/sendEmail', async (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  const mailOptions = {
    from: process.env.GMAILID,
    to: email,
    subject: 'Launching Soon!',
    html: `
      <div style="text-align: center;">
        <img src="https://m.media-amazon.com/images/I/41YvjAcEc3L._SY445_SX342_QL70_FMwebp_.jpg" alt="Launching Soon" style="max-width: 100%; height: auto;"/>
        <h1>Launching Soon on site to buy</h1>
        <p>We are excited to announce that something amazing is coming soon. Stay tuned!</p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    res.status(200).json({ message: 'Email sent successfully' })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: 'Failed to send email' })
  }
})

module.exports = router
