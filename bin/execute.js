const pMap = require('p-map')
const plan = require('../src/plan')
const createCall = require('../src/twilio/createCall')
const createServer = require('../src/twilio/server')

let server
const vals = Object.values(plan.value)
const queue = vals.filter((i) => i.attempts < 3 && i.phoneNumberMeta.valid && !i.response)

const processRecord = async (planItem) => {
  console.log('Calling', planItem.record.name, 'via', planItem.record.phone)
  plan.update(planItem.record.id, { attempts: planItem.attempts + 1 })
  await plan.save()
  await createCall(planItem.record, server.urls)
  await new Promise((resolve) => setTimeout(resolve, 30000)) // wait 30s between calls so we dont send out thousands of calls at once
}

const run = async () => {
  console.log(`Plan contains ${vals.length} items, and we are contacting ${queue.length}...`)
  server = await createServer()
  await pMap(queue, processRecord, { concurrency: 5 })
}

if (queue.length === 0) {
  console.log('Everyone we need to call has already responded, or run out of attempts!')
  process.exit()
}

run()
  .then(() => {
    console.log('Calls are going out! Please wait 5-10 minutes after the last message before closing this process.')
    setInterval(() => plan.save(), 3000)
  })
  .catch((err) => {
    console.error('Plan generation failed!', err)
    process.exit(1)
  })
