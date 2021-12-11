const fs = require('fs')
const testInput = fs.readFileSync('./day-6/day6-1_input.txt', 'utf-8')
  .split(',').map(i => Number(i))

// const testInput = '3,4,3,1,2'.split(',').map(i => Number(i))
// console.log('ti', testInput)

for (let i = 0; i < 80; i++) {
  let fishToAdd = 0
  testInput.forEach((fish, i) => {
    const updatedFish = fish - 1
    if (updatedFish < 0) fishToAdd++
    testInput[i] = updatedFish < 0 ? 6 : updatedFish
  })
  for (let j = 0; j < fishToAdd; j++) {
    testInput.push(8)
  }
}

console.log(testInput.length)
