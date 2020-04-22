const meow = require('meow')
const request = require('superagent')
const fs = require('fs')
const path = require('path')

const outPath = path.join(__dirname, '../data/input.json')
const cli = meow(`
Usage
  $ download <business permit export URL>

Examples
  $ download https://municipal.systems/v1/sources/SOURCE_ID/export?format=json&key=YOUR_KEY
`)

const [ url ] = cli.input
if (!url || !new URL(url)) throw new Error('Invalid or missing URL!')

console.log('Downloading...')
request.get(url)
  .pipe(fs.createWriteStream(outPath))
  .once('error', (err) => {
    console.error('Error downloading:', err)
    process.exit(1)
  })
  .once('finish', () => {
    console.log('Finished downloading!')
    process.exit()
  })
