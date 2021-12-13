const fs = require('fs')
const testInput = fs.readFileSync('./day-9/day9-1_input.txt', 'utf-8')
  .split('\n').map(i => i.split('').map(i => Number(i)))

// const testInput = '2199943210\n3987894921\n9856789892\n8767896789\n9899965678'.split('\n').map(i => i.split('').map(i => Number(i)))
// console.log(testInput)

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
      lowPoints.push({point: pointToValidate, row: rowIdx, column: i})
    }
  }
})

const biggestBasins = []
lowPoints.forEach(lowPoint => {
  let currentBasin = []
  mapBasin(lowPoint)
  const uniquePoints = currentBasin.filter((point, idx) => {
    return idx === currentBasin.findIndex(point2 => point2.row === point.row && point2.column === point.column)
  })
  const totalPoints = uniquePoints.length + 1 // for original point
  if (biggestBasins.length < 3) {
    biggestBasins.push(totalPoints)
  } else {
    biggestBasins.sort((a, b) => a - b)

    if (biggestBasins[0] <= totalPoints) {
      biggestBasins[0] = totalPoints
    }
  }
  function mapBasin ({point, row, column}) {
    const {abovePoint, belowPoint, previousPoint, nextPoint} = getSurroundingPoints({point, row, column})
    const basinPoints = []

    if (abovePoint && abovePoint > point && abovePoint !== 9) basinPoints.push({point: abovePoint, row: row - 1, column})
    if (belowPoint && belowPoint > point && belowPoint !== 9) basinPoints.push({point: belowPoint, row: row + 1, column})
    if (previousPoint && previousPoint > point && previousPoint !== 9) basinPoints.push({point: previousPoint, row, column: column - 1})
    if (nextPoint && nextPoint > point && nextPoint !== 9) basinPoints.push({point: nextPoint, row, column: column + 1})
    currentBasin.push(...basinPoints)
    basinPoints.forEach(basinPoint => mapBasin(basinPoint))
  }
})

function getSurroundingPoints ({row, column}) {
  const abovePoint = testInput[row - 1]?.[column]
  const belowPoint = testInput[row + 1]?.[column]
  const previousPoint = testInput[row][column - 1]
  const nextPoint = testInput[row][column + 1]
  return {abovePoint, belowPoint, previousPoint, nextPoint}
}

console.log('SUM', biggestBasins[0] * biggestBasins[1] * biggestBasins[2])
