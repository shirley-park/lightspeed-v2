// import express from 'express'
// import path from 'path'

const express = require('express')
const axios = require('axios')
// const path = require('path')

const server = express()

server.use(express.json())
// server.use(express.static(path.join(__dirname, 'public')))

server.get('/', async (req, res) => {
  // console.log('root route')
  // res.json({ message: 'Hello World!' })
  const response = await axios.get(
    'https://otx0e1z2lg.execute-api.us-west-2.amazonaws.com/products'
  )

  console.log(response.data)

  res.json(response.data)
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', PORT)
})

// export default server

module.exports = {
  server,
}
