const retry = require('retry-as-promised')
const twilio = require('./')

const retryPolicy = {
  max: 10
}
module.exports = async (record) => {
  if (!record.phone) return { missing: true }
  const res = await retry(() =>
    twilio.lookups.phoneNumbers(record.phone).fetch({ type: [ 'carrier' ] })
  , retryPolicy)
    .catch(() => null)

  if (!res) return { invalid: true }
  if (res.carrier && res.carrier.type === 'mobile') return { mobile: true } // mobile phone, we dont want to call these
  if (res.carrier && res.carrier.error_code) return { invalid: true }
  return { valid: true }
}
