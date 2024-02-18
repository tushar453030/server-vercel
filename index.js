const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')
const stripeRoute = require('./routes/stripe')
const cors = require('cors')

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('DB connected succesfully')
  })
  .catch((err) => {
    console.log(err)
  })
const corsOptions = {
  origin: 'https://main--radiant-cassata-a46fa9.netlify.app',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json()) // By this we can able to pass JSON via body as req
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/api/orders', orderRoute)
app.use('/api/carts', cartRoute)
app.use('/api/checkout', stripeRoute)
app.use('/', (req, res) => {
  res.send('ello')
})

const port = process.env.PORT || 3000

app.listen(port, '0.0.0.0', () => {
  console.log('Backend server is running')
})
