const fs = require('fs')
const testInput = fs.readFileSync('./day-12/day12-1_input.txt', 'utf-8')
  .split('\n').map(i => i.split('-'))

// const testInput = 'start-A\nstart-b\nA-c\nA-b\nb-d\nA-end\nb-end'
//   .split('\n').map(i => i.split('-'))
console.log('T', testInput)

let paths = 0
function findPath (currentPosition = 'start', path = []) {
  const isSmallCave = currentPosition === currentPosition.toLowerCase()
  if (isSmallCave && path.includes(currentPosition)) {
    return
  }
  const connectionsForPosition = testInput.filter(caveConnection => caveConnection.includes(currentPosition))
  for (let connection of connectionsForPosition) {
    const [caveOne, caveTwo] = connection
    const nextCave = currentPosition === caveOne ? caveTwo : caveOne
    if (nextCave === 'end') {
      paths++
    } else {
      path = [...path, currentPosition]
      findPath(nextCave, path)
    }
  }
}

findPath()
console.log('Paths', paths)
