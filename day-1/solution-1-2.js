const fs = require('fs')
const testInput = fs.readFileSync('./day-1/day1-1_input.txt', 'utf-8').split('\n').map(val => Number(val))
// const testInput = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263] // result should be 7

let numberOfIncreases = 0

for (let i = 0; i < testInput.length - 3; i++) {
  const fisrtWindowStart = testInput[i]
  const secondWindowEnd = testInput[i + 3]
  if (secondWindowEnd > fisrtWindowStart) {
    numberOfIncreases++
  }
}

console.log('RESULT:', numberOfIncreases)
