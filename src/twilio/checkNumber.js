const twilio = require('./')

module.exports = async (record) => {
  if (!record.phone) return { missing: true }
  const res = await twilio.lookups.phoneNumbers(record.phone)
    .fetch({ type: [ 'carrier' ] })

  if (res.carrier && res.carrier.type === 'mobile') return { mobile: true } // mobile phone, we dont want to call these
  if (res.carrier && res.carrier.error_code) return { invalid: true }
  return { valid: true }
}
