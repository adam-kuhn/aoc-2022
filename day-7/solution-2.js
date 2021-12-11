const fs = require('fs')
const testInput = fs.readFileSync('./day-7/day7-1_input.txt', 'utf-8')
  .split(',').map(i => Number(i))

const max = Math.max(...testInput)
const min = Math.min(...testInput)
const sumEquation = (num) => (num + 1) * num / 2

let minFuel

for (let pos = min; pos <= max; pos++) {
  let fuelUsed = 0
  for (let crab of testInput) {
    fuelUsed += sumEquation(Math.abs(crab - pos))
    if (minFuel && fuelUsed >= minFuel) break
  }
  if (fuelUsed < minFuel || !minFuel) {
    minFuel = fuelUsed
  }
}

console.log(minFuel)
