const pMap = require('p-map')
const plan = require('../src/plan')
const checkNumber = require('../src/twilio/checkNumber')
const input = require('../data/input.json')

const counts = {
  missing: 0,
  mobile: 0,
  invalid: 0,
  valid: 0
}
const processRecord = async (record) => {
  if (plan.get(record.id)) return // already generated for this, skip!
  console.log('Checking', record.name, 'for', record.phone)
  const phoneNumberMeta = await checkNumber(record)
  plan.update(record.id, { record, attempts: 0, phoneNumberMeta })
  Object.keys(phoneNumberMeta).forEach((k) => counts[k] += 1)
  await plan.save()
}

const run = async () => {
  console.log('Generating plan for', input.length, 'records...')
  await pMap(input, processRecord, { concurrency: 10 })
}

run()
  .then(() => {
    console.log('Plan generated! Breakdown:')
    console.log('Missing:', counts.missing)
    console.log('Invalid:', counts.invalid)
    console.log('Mobile (Do Not Call):', counts.mobile)
    console.log('Valid:', counts.valid)
  })
  .catch((err) => {
    console.error('Plan generation failed!', err)
    process.exit(1)
  })
