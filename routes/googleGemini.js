const express = require('express')
const router = express.Router()
const { GoogleGenerativeAI } = require('@google/generative-ai')
const dotenv = require('dotenv')

const { GoogleGenAI } = require('@google/genai')

dotenv.config()

const gemini_api_key = process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: gemini_api_key })

// Configure Google Generative AI

const googleAI = new GoogleGenerativeAI(gemini_api_key)
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 200,
}

const geminiModel = googleAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
  generationConfig: geminiConfig,
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

    //const result = await geminiModel.generateContent(prompt)
    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    })

    const response = result.text
    console.log(response)
    res.json({ comparison: response })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'An error occurred while processing your request' })
  }
})

module.exports = router
