const prompt = require('../config/prompt')

module.exports = (phoneNumber, digits='') => {
  const actualDigits = parseInt(digits.slice(0, 1))
  const chosenOption = prompt.options.find((o) => o.key === actualDigits)
  const chosenValue = chosenOption ? chosenOption.value : null
  console.log('Saving value', chosenValue, 'for', phoneNumber)
  // TODO!
}
