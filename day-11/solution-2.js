const fs = require('fs')
const testInput = fs.readFileSync('./day-11/day11-1_input.txt', 'utf-8')
  .split('\n').map(i => i.split('').map(val => Number(val)))

// const testInput = `5483143223\n2745854711\n5264556173\n6141336146\n6357385478\n4167524645\n2176841721\n6882881134\n4846848554\n5283751526`
//   .split('\n').map(i => i.split('').map(val => Number(val)))
// const testInput = '11111\n19991\n19191\n19991\n11111'.split('\n').map(i => i.split('').map(val => Number(val)))
// console.log('T', testInput)
let stateOfOctupus = testInput
for (let i = 0; i > -1; i++) {
  const energizedOctopus = increaseEnergyByOne(stateOfOctupus)
  const flashed = flashOctopus(energizedOctopus)
  stateOfOctupus = flashed.map(row => row.map(oct => oct < 0 ? 0 : oct))
  if (stateOfOctupus.every(row => row.every(oct => oct === 0))) {
    console.log('BIG FLASH', i + 1)
    break
  }
}

function increaseEnergyByOne (octopusState) {
  return octopusState.map(row => row.map(oct => oct + 1))
}

function flashOctopus (octopusState) {
  const increasePoint = (row, col) => {
    const oct = octopusState[row][col]
    if (oct >= 0) {
      octopusState[row][col]++
    }
  }
  octopusState.forEach((row, rowIdx) => {
    const previousRow = octopusState[rowIdx - 1]
    const nextRow = octopusState[rowIdx + 1]
    row.forEach((oct, octIdx) => {
      const previousOct = row[octIdx - 1]
      const nextOct = row[octIdx + 1]
      if (oct > 9) {
        octopusState[rowIdx][octIdx] = -1
        if (previousRow) {
          // upper left
          increasePoint(rowIdx - 1, octIdx - 1)
          // upper right
          increasePoint(rowIdx - 1, octIdx + 1)
          increasePoint(rowIdx - 1, octIdx)
        }
        if (nextRow) {
          increasePoint(rowIdx + 1, octIdx - 1)
          increasePoint(rowIdx + 1, octIdx + 1)
          increasePoint(rowIdx + 1, octIdx)
        }
        if (previousOct >= 0) {
          increasePoint(rowIdx, octIdx - 1)
        }
        if (nextOct >= 0) {
          increasePoint(rowIdx, octIdx + 1)
        }
      }
    })
  })
  const readyToFlash = octopusState.flat().filter(i => i > 9)
  if (readyToFlash.length) {
    flashOctopus(octopusState)
  }
  return octopusState
}
