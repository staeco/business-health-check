const ngrok = require('ngrok')
const express = require('express')
const bodyParser = require('body-parser')
const plan = require('../plan')
const markup = require('./markup')
const prompt = require('../../config/prompt')
const port = require('../../config/server')

const actualPort = process.env.PORT || port
const humanAnswers = [ 'human', 'unknown' ]
module.exports = async () => {
  const app = express()
  app.use(bodyParser.urlencoded({ extended: false }))

  // this handles what to do when they pick up the phone
  app.post('/call-started', (req, res) => {
    const isHumanAnswer = humanAnswers.includes(req.body.AnsweredBy)
    const { record } = plan.get(req.query.id)

    if (!isHumanAnswer || !record) {
      return res
        .type('text/xml')
        .status(200)
        .send(markup.hangup())
        .end()
    }

    res
      .type('text/xml')
      .status(200)
      .send(markup.opening(record, app.urls.digits(record)))
      .end()
  })

  // this handles what to do when they press digits
  app.post('/digits', (req, res) => {
    const { Digits } = req.body
    const { record } = plan.get(req.query.id)

    res
      .type('text/xml')
      .status(200)
      .send(markup.closing())
      .end()

    // save the response to the plan
    const actualDigits = parseInt(Digits.slice(0, 1))
    const chosenOption = prompt.options.find((o) => o.key === actualDigits)
    const chosenValue = chosenOption ? chosenOption.value : null
    console.log(record.name, 'responded with', chosenValue)
    plan.update(record.id, { response: chosenValue, responseTime: new Date() })
    plan.save().catch((err) => console.error(err))
  })

  // wire stuff up
  const server = app.listen(actualPort)
  const tunnelUrl = await ngrok.connect(actualPort)
  app.urls = {
    primary: (record) => `${tunnelUrl}/call-started?id=${record.id}`,
    digits: (record) => `${tunnelUrl}/digits?id=${record.id}`
  }
  app.close = async () => {
    await ngrok.disconnect()
    server.close()
  }
  return app
}
