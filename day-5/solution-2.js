const fs = require('fs')
// const testInput = [
//   '0,9 -> 5,9',
//   '8,0 -> 0,8',
//   '9,4 -> 3,4',
//   '2,2 -> 2,1',
//   '7,0 -> 7,4',
//   '6,4 -> 2,0',
//   '0,9 -> 2,9',
//   '3,4 -> 1,4',
//   '0,0 -> 8,8',
//   '5,5 -> 8,2'].map(i => {
//   const line = i.split(' -> ')
//   const [xOne, yOne] = line[0].split(',')
//   const [xTwo, yTwo] = line[1].split(',')
//   return {xOne, yOne, xTwo, yTwo}
// })
const testInput = fs.readFileSync('./day-5/day5-1_input.txt', 'utf-8')
  .split('\n')
  .map(i => {
    const line = i.split(' -> ')
    const [xOne, yOne] = line[0].split(',')
    const [xTwo, yTwo] = line[1].split(',')
    return {xOne, yOne, xTwo, yTwo}
  })

let straightLines = []
let diagonalLines = []

testInput.forEach(line => {
  if (line.xOne === line.xTwo || line.yOne === line.yTwo) {
    straightLines.push(line)
  } else {
    diagonalLines.push(line)
  }
})

const markedPoints = {}

straightLines.forEach((line) => {
  fillStraightLine(line, line.xOne === line.xTwo)
})

diagonalLines.forEach(line => {
  fillDiagonalLine(line)
})

const crossingPoints = Object.values(markedPoints).filter(val => val > 1).length

console.log(crossingPoints)

function fillDiagonalLine (line) {
  const startX = Number(line.xOne)
  const endX = Number(line.xTwo)
  const startY = Number(line.yOne)
  const endY = Number(line.yTwo)
  const xIncrement = startX > endX ? -1 : 1
  const yIncrement = startY > endY ? -1 : 1

  const endCondition = startX > endX ? (x, end) => x >= end : (x, end) => x <= end
  for (let x = startX, y = startY; endCondition(x, endX); x += xIncrement, y += yIncrement) {
    const point = x + '-' + y
    if (markedPoints[point] === undefined) {
      markedPoints[point] = 1
    } else {
      markedPoints[point]++
    }
  }
}

function fillStraightLine (line, isXTheSame) {
  let startNummber = Number(line.xOne)
  let endNumber = Number(line.xTwo)
  if (isXTheSame) {
    startNummber = Number(line.yOne)
    endNumber = Number(line.yTwo)
  }
  let startIndex = startNummber
  let endIndex = endNumber
  if (startNummber > endNumber) {
    startIndex = endNumber
    endIndex = startNummber
  }
  for (let i = startIndex; i <= endIndex; i++) {
    const point = isXTheSame ? line.xOne + '-' + i : i + '-' + line.yOne

    if (markedPoints[point] === undefined) {
      markedPoints[point] = 1
    } else {
      markedPoints[point]++
    }
  }
}
