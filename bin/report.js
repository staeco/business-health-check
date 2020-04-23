const capitalize = require('capitalize')
const plan = require('../src/plan')

const incr = (v=0, v2=1) => v + v2
const vals = Object.values(plan.value)
const metrics = vals.reduce((acc, plan) => {
  if (plan.response) {
    acc[plan.response] = incr(acc[plan.response])
  } else {
    acc['no response yet'] = incr(acc['no response yet'])
  }
  if (plan.attempts !== 0) acc['calls made'] = incr(acc['calls made'], plan.attempts)
  return acc
}, {})

console.log('=== Current Status ===')
console.log('Total on the list:', vals.length)
Object.entries(metrics).forEach(([ k, v ]) => {
  console.log(`${capitalize.words(k)}: ${v}`)
})
