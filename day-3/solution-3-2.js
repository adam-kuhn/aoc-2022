const fs = require('fs')
const testInput = fs.readFileSync('./day-3/day3-1_input.txt', 'utf-8').split('\n')
// const testInput = ['00100', '11110', '10110', '10111', '10101', '01111', '00111', '11100', '10000', '11001', '00010', '01010']
const byteLength = testInput[0].length
let oxygenInputs = testInput
let co2Inputs = testInput

for (let i = 0; i < byteLength; i++) {
  if (co2Inputs.length === 1 && oxygenInputs.length === 1) {
    break
  }
  if (oxygenInputs.length > 1) {
    filterOxygenInputs(i)
  }
  if (co2Inputs.length > 1) {
    filterCo2Inputs(i)
  }
}
function filterOxygenInputs (byteIndex) {
  let zero = []
  let one = []
  oxygenInputs.forEach(input => {
    const byte = input.charAt(byteIndex)
    if (byte === '0') zero.push(input)
    else one.push(input)
  })
  if (zero.length === one.length) {
    oxygenInputs = one
  } else if (zero.length > one.length) {
    oxygenInputs = zero
  } else {
    oxygenInputs = one
  }
}
function filterCo2Inputs (byteIndex) {
  let zero = []
  let one = []
  co2Inputs.forEach(input => {
    const byte = input.charAt(byteIndex)
    if (byte === '0') zero.push(input)
    else one.push(input)
  })
  if (zero.length === one.length) {
    co2Inputs = zero
  } else if (zero.length > one.length) {
    co2Inputs = one
  } else {
    co2Inputs = zero
  }
}
const decimalOxygen = parseInt(oxygenInputs[0], 2)
const decimalCo2 = parseInt(co2Inputs[0], 2)
console.log('RESULT', decimalOxygen * decimalCo2)
