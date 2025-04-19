const express = require('express')
const router = express.Router()
const { GoogleGenerativeAI } = require('@google/generative-ai')
const dotenv = require('dotenv')

dotenv.config()

// Configure Google Generative AI
const gemini_api_key = process.env.GEMINI_API_KEY
console.log(gemini_api_key);
const googleAI = new GoogleGenerativeAI(gemini_api_key)
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 200,
}

const geminiModel = googleAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  geminiConfig,
})

router.post('/sendGemini', async (req, res) => {
  try {
    const { products } = req.body
    console.log(products)

    if (!products || products.length !== 2) {
      return res
        .status(400)
        .send({ error: 'Please provide exactly 2 products' })
    }

    const product1 = products[0]
    const product2 = products[1]

    console.log(product1.desc)

    const prompt = `
      Compare the following two products and tell me in two lines which one is better and why:
      Product 1: ${JSON.stringify(product1.desc)}
      Product 2: ${JSON.stringify(product2.desc)}
    `

    const result = await geminiModel.generateContent(prompt)

    const response = result.response

    res.json({ comparison: response.text() })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'An error occurred while processing your request' })
  }
})

module.exports = router
