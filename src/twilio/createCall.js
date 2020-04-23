const retry = require('retry-as-promised')
const twilio = require('./')

const retryPolicy = {
  max: 10
}
module.exports = (record, urls) =>
  retry(() =>
    twilio.calls.create({
      machineDetection: 'Enable',
      url: urls.primary(record),
      to: record.phone,
      from: twilio.phoneNumber
    })
  , retryPolicy)
