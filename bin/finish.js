const fs = require('fs')
const path = require('path')
const plan = require('../src/plan')

const output = Object.values(plan.value).map((v) => ({
  ...v.record,
  status: v.response,
  lastStatusUpdateAt: v.responseTime
}))

fs.writeFileSync(path.join(__dirname, '../data/updates.json'), JSON.stringify(output, null, 2), 'utf8')
