const fs = require('fs')
const testInput = fs.readFileSync('./day-12/day12-1_input.txt', 'utf-8')
  .split('\n').map(i => i.split('-'))

// console.log('T', testInput)

let paths = 0
function findPath (currentPosition = 'start', path = [], anySmallCaveTwice = false, twice = null) {
  if (path.includes(currentPosition) && currentPosition === 'start') return

  const isSmallCave = currentPosition === currentPosition.toLowerCase()
  if (isSmallCave && path.includes(currentPosition)) {
    if (anySmallCaveTwice) return
    anySmallCaveTwice = true
  }

  const connectionsForPosition = testInput.filter(caveConnection => caveConnection.includes(currentPosition))
  for (let connection of connectionsForPosition) {
    const [caveOne, caveTwo] = connection
    const nextCave = currentPosition === caveOne ? caveTwo : caveOne
    if (nextCave === 'end') {
      paths++
    } else {
      path = [...path, currentPosition]
      findPath(nextCave, path, anySmallCaveTwice, twice)
    }
  }
}

findPath()
console.log('Paths', paths)
