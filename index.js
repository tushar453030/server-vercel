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
const openAIRoutes = require('./routes/openAIRoutes')
const googleGemini = require('./routes/googleGemini')
const cors = require('cors')

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('DB connected succesfully')
  })
  .catch((err) => {
    console.log(err)
  })

app.use(cors())
app.use(express.json()) // By this we can able to pass JSON via body as req

app.use('/', (req, res) => {
  res.json('Hello its me ')
})

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/api/orders', orderRoute)
app.use('/api/carts', cartRoute)
app.use('/api/checkout', stripeRoute)

app.use('/api/compareOpenAI', openAIRoutes)
app.use('/api/gimini', googleGemini)

app.listen(5000, () => {
  console.log('Backend server is running')
})
