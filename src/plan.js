const fs = require('fs')
const util = require('util')
const path = require('path')

const writeFileAsync = util.promisify(fs.writeFile)
const planName = process.env.NODE_ENV === 'testing' ? 'test-plan' : 'plan'
const planPath = path.join(__dirname, `../data/${planName}.json`)

let plan
try {
  plan = require(planPath)
} catch (err) {
  plan = {}
}

const ctx = {
  value: plan,
  wipe: () => {
    ctx.value = {}
  },
  get: (recordId) => ctx.value[recordId],
  update: (recordId, update) => {
    ctx.value[recordId] = {
      ...ctx.value[recordId] || {},
      ...update
    }
    return ctx
  },
  save: async () =>
    writeFileAsync(planPath, JSON.stringify(ctx.value), 'utf8')
}

module.exports = ctx
