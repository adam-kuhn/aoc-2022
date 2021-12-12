const fs = require('fs')
const testInput = fs.readFileSync('./day-9/day9-1_input.txt', 'utf-8')
  .split('\n').map(i => i.split('').map(i => Number(i)))

// const testInput = '2199943210\n3987894921\n9856789892\n8767896789\n9899965678'.split('\n').map(i => i.split('').map(i => Number(i)))
console.log(testInput)

const lowPoints = []
testInput.forEach((row, rowIdx) => {
  const previousRow = testInput[rowIdx - 1]
  const nextRow = testInput[rowIdx + 1]
  for (let i = 0; i < row.length; i++) {
    const pointToValidate = row[i]
    const previousPoint = row[i - 1]
    const nextPoint = row[i + 1]

    let isLowPoint = false
    if (previousRow) {
      const abovePoint = previousRow[i]
      isLowPoint = pointToValidate < abovePoint
      if (!isLowPoint) continue
    }
    if (nextRow) {
      const belowPoint = nextRow[i]
      isLowPoint = pointToValidate < belowPoint
      if (!isLowPoint) continue
    }
    if (previousPoint >= 0) {
      isLowPoint = pointToValidate < previousPoint
      if (!isLowPoint) continue
    }
    if (nextPoint >= 0) {
      isLowPoint = pointToValidate < nextPoint
      if (!isLowPoint) continue
    }
    if (isLowPoint) {
      lowPoints.push(pointToValidate)
    }
  }
})

const sum = lowPoints.reduce((acc, curr) => acc + curr + 1, 0)
console.log('SUM', sum)
