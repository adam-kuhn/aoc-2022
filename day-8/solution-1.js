const fs = require('fs')
const testInput = fs.readFileSync('./day-8/day8-1_input.txt', 'utf-8')
  .split('\n')
  .flatMap(i => i.split('|')[1].split(' '))

console.log('T', testInput)

const uniqueDigits = testInput.filter(i =>
  i.length === 2 ||
  i.length === 3 ||
  i.length === 4 ||
  i.length === 7).length

console.log(uniqueDigits)
