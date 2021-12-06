const fs = require('fs')
const testInput = fs.readFileSync('./day-2/day2-1_input.txt', 'utf-8').split('\n').map(input => input.split(' '))

let depth = 0
let horizontal = 0
testInput.forEach(input => {
  const [direction, value] = input
  switch (direction) {
    case 'forward': {
      horizontal += Number(value)
      break
    }
    case 'down': {
      depth += Number(value)
      break
    }
    case 'up': {
      depth -= Number(value)
      break
    }
    default: {
      throw new Error(`Unrecognized direction ${direction}`)
    }
  }
}
)
console.log('Result', depth * horizontal)
