const twilio = require('./')

module.exports = async (business) => {
  if (!business.phone) return 'missing number'
  const res = await twilio.lookups.phoneNumbers(business.phone)
    .fetch({ type: [ 'carrier' ] })

  if (res.carrier?.type === 'mobile') return 'mobile number' // mobile phone, we dont want to call these
  if (res.carrier?.error_code) return 'invalid number'
  return true
}
