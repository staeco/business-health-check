const capitalize = require('capitalize')
const plan = require('../src/plan')

const incr = (v=0, v2=1) => v + v2
const vals = Object.values(plan.value)
const metrics = vals.reduce((acc, plan) => {
  if (plan.response) {
    acc[`responded ${plan.response}`] = incr(acc[`responded ${plan.response}`])
  } else {
    if (plan.attempts !== 0) {
      acc['called with no response'] = incr(acc['called with no response'])
    }
  }
  if (plan.attempts !== 0) acc['calls made'] = incr(acc['calls made'], plan.attempts)
  return acc
}, {})

console.log('=== Current Status ===')
Object.entries(metrics).forEach(([ k, v ]) => {
  console.log(`${capitalize.words(k)}: ${v}`)
})
