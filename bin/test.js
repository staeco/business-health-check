const meow = require('meow')
const placeCall = require('../src/twilio/placeCall')
const createServer = require('../src/twilio/server')

const cli = meow(`
Usage
  $ test <phone number>
`)

const [ phone ] = cli.input
if (!phone) throw new Error('Missing phone number!')

const fakeBusiness = {
  name: 'Martha\'s Bakery #12',
  phone
}

const run = async () => {
  console.log('Starting server...')
  const server = await createServer()
  console.log('Placing test call...')
  return placeCall(fakeBusiness, server.responseUrl)
}

run()
  .then(() => {
    console.log('Call placed! Please wait a moment before closing this process.')
  })
  .catch((err) => {
    console.error('Call failed!', err)
    process.exit(1)
  })
