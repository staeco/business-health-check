const twilio = require('twilio')
const twilioConfig = require('../../config/secret-keys')

const accountSid = process.env.TWILIO_ACCOUNT_SID || twilioConfig.accountSid
const authToken = process.env.TWILIO_AUTH_TOKEN || twilioConfig.authToken
const phoneNumber = process.env.TWILIO_PHONE_NUMBER || twilioConfig.phoneNumber

const conn = twilio(accountSid, authToken, { lazyLoading: true })
conn.phoneNumber = phoneNumber

module.exports = conn
