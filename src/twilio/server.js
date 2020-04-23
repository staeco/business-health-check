const ngrok = require('ngrok')
const express = require('express')
const bodyParser = require('body-parser')
const createCallMarkup = require('./createCallMarkup')
const saveResponse = require('../saveResponse')
const port = require('../../config/server')

const actualPort = process.env.PORT || port

module.exports = async () => {
  const app = express()
  app.use(bodyParser.urlencoded({ extended: false }))
  app.post('/response', (req, res) => {
    const { To, Digits } = req.body
    res
      .type('text/xml')
      .status(200)
      .send(createCallMarkup.closing())
      .end()

    saveResponse(To, Digits)
  })

  const server = app.listen(actualPort)
  const tunnelUrl = await ngrok.connect(actualPort)
  app.responseUrl = `${tunnelUrl}/response`
  app.close = async () => {
    await ngrok.disconnect()
    server.close()
  }
  return app
}
