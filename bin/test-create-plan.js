const meow = require('meow')
const plan = require('../src/plan')

const cli = meow(`
Usage
  $ create-test-plan <phone number>
`)

const [ phone ] = cli.input
if (!phone) throw new Error('Missing phone number!')
const record = {
  id: '1234',
  name: 'Martha\'s Bakery #12',
  phone
}

const run = async () => {
  // wipe and create a fake plan
  plan.wipe()
  plan.update(record.id, { record, attempts: 0, phoneNumberMeta: { valid: true } })
  await plan.save()
}

run()
  .then(() => {
    console.log('Plan created!')
  })
  .catch((err) => {
    console.error('Call failed!', err)
    process.exit(1)
  })
