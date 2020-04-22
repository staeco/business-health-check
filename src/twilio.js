const twilio = require('twilio')
const twilioConfig = require('../config/keys')

const accountSid = twilioConfig.accountSid || process.env.TWILIO_ACCOUNT_SID
const authToken = twilioConfig.authTOken || process.env.TWILIO_AUTH_TOKEN

module.exports = twilio(accountSid, authToken, { lazyLoading: true })
