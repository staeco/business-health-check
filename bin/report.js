const capitalize = require('capitalize')
const plan = require('../src/plan')

const incr = (v=0, v2=1) => v + v2
const vals = Object.values(plan.value)

const planMetrics = vals.reduce((acc, plan) => {
  acc.total += 1
  if (plan.phoneNumberMeta.invalid) acc.invalid += 1
  if (plan.phoneNumberMeta.mobile) acc.mobile += 1
  if (plan.phoneNumberMeta.valid) acc.valid += 1
  acc.callsPerformed += plan.attempts
  return acc
}, {
  total: 0,
  mobile: 0,
  invalid: 0,
  valid: 0,
  callsPerformed: 0
})

const responseMetrics = vals.reduce((acc, plan) => {
  if (plan.response) {
    acc[`responded ${plan.response}`] = incr(acc[`responded ${plan.response}`])
  } else {
    if (plan.attempts !== 0) acc['no response'] = incr(acc['no response'])
  }
  return acc
}, {})

console.log(`=== Plan ===`)
console.log('Total Businesses:', planMetrics.total)
console.log('Removed from the survey because it was a mobile phone:', planMetrics.mobile)
console.log('Removed from the survey because it was an invalid number:', planMetrics.invalid)
console.log('Actual number being surveyed:', planMetrics.valid)
console.log('Calls Performed:', planMetrics.callsPerformed)
console.log('')
console.log(`=== Call Responses ===`)
Object.entries(responseMetrics).forEach(([ k, v ]) => {
  console.log(`${capitalize.words(k)}:`, v)
})
