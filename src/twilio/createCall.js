const twilio = require('./')

module.exports = (record, urls) =>
  twilio.calls.create({
    machineDetection: 'Enable',
    url: urls.primary(record),
    to: record.phone,
    from: twilio.phoneNumber
  })
