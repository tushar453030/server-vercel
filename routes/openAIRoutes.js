const router = require('express').Router()
const OpenAIApi = require('openai')

// Configure OpenAI API
const openai = new OpenAIApi.OpenAI({ key: process.env.OPENAI_API_KEY })

router.post('/sendOpenAI', async (req, res) => {
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

    const response = await openai.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt: prompt,
      max_tokens: 100,
    })

    const comparison = response.data.choices[0].text.trim()

    res.json({ comparison })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'An error occurred while processing your request' })
  }
})

module.exports = router
