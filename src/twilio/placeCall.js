const twilio = require('./')
const createCallMarkup = require('./createCallMarkup')

module.exports = (business, responseUrl) =>
  twilio.calls.create({
    twiml: createCallMarkup.opening(business, responseUrl),
    to: business.phone,
    from: twilio.phoneNumber
  })
