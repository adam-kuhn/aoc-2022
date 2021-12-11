const fs = require('fs')
const testInput = fs.readFileSync('./day-6/day6-1_input.txt', 'utf-8')
  .split(',').map(i => Number(i))

// const testInput = '3,4,3,1,2'.split(',').map(i => Number(i))

const filterFilterfish = (day) => testInput.filter(fish => fish === day).length
const groupedFish = {
  dayZero: filterFilterfish(0),
  dayOne: filterFilterfish(1),
  dayTwo: filterFilterfish(2),
  dayThree: filterFilterfish(3),
  dayFour: filterFilterfish(4),
  dayFive: filterFilterfish(5),
  daySix: filterFilterfish(6),
  daySeven: 0,
  dayEight: 0
}

for (let i = 0; i < 256; i++) {
  const dayZeroStart = groupedFish.dayZero
  const dayOneStart = groupedFish.dayOne
  const dayTwoStart = groupedFish.dayTwo
  const dayThreeStart = groupedFish.dayThree
  const dayFourStart = groupedFish.dayFour
  const dayFiveStart = groupedFish.dayFive
  const daySixStart = groupedFish.daySix
  const daySevenStart = groupedFish.daySeven
  const dayEightStart = groupedFish.dayEight

  groupedFish.dayZero = dayOneStart
  groupedFish.dayOne = dayTwoStart
  groupedFish.dayTwo = dayThreeStart
  groupedFish.dayThree = dayFourStart
  groupedFish.dayFour = dayFiveStart
  groupedFish.dayFive = daySixStart
  groupedFish.daySix = daySevenStart + dayZeroStart
  groupedFish.daySeven = dayEightStart
  groupedFish.dayEight = dayZeroStart
}

const sum = Object.values(groupedFish).reduce((acc, cur) => acc + cur, 0)

console.log(sum)
