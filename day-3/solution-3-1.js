const fs = require('fs')
const testInput = fs.readFileSync('./day-3/day3-1_input.txt', 'utf-8').split('\n')
// const testInput =  ['00100', '11110', '10110', '10111', '10101', '01111', '00111', '11100', '10000', '11001', '00010', '01010']

const digits = {}
testInput.forEach(input => {
  const arrayInput = input.split('')
  arrayInput.forEach((digit, idx) => {
    if (digits[idx] === undefined) {
      digits[idx] = {zero: 0, one: 0}
    }
    if (digit === '0') {
      digits[idx].zero += 1
    } else {
      digits[idx].one += 1
    }
  })
})

const binaryResult = Object.keys(digits).reduce((acc, curr) => {
  if (digits[curr].one > digits[curr].zero) {
    acc.mostCommon += '1'
    acc.leastCommon += '0'
  } else {
    acc.mostCommon += '0'
    acc.leastCommon += '1'
  }
  return acc
}, {mostCommon: '', leastCommon: ''})

console.log('RESULT', parseInt(binaryResult.mostCommon, 2) * parseInt(binaryResult.leastCommon, 2))