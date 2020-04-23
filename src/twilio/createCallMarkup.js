const { template } = require('lodash')
const { twiml } = require('twilio')
const prompt = require('../../config/prompt')

const sayOpt = { language: prompt.language, voice: prompt.voice }

module.exports.closing = () => {
  const response = new twiml.VoiceResponse()
  response
    .say(prompt.closing, sayOpt)

  return response.toString()
}

module.exports.opening = (business, responseUrl) => {
  const options = prompt.options.map((o) =>
    `If ${o.label} please press ${o.key}`
  ).join('. ')
  const fullText = `${prompt.greeting}. ${options}.`
  const response = new twiml.VoiceResponse()
  response
    .gather({
      finishOnKey: '',
      numDigits: 1,
      action: responseUrl
    })
    .say(template(fullText)(business), sayOpt)

  return response.toString()
}
