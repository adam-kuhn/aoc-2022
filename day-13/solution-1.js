const fs = require('fs')
const testInput = fs.readFileSync('./day-13/day13-1_input.txt', 'utf-8').split('\n')

// const testInput = '6,10\n0,14\n9,10\n0,3\n10,4\n4,11\n6,0\n6,12\n4,1\n0,13\n10,12\n3,4\n3,0\n8,4\n1,10\n2,14\n8,10\n9,0\nfold along y=7\nfold along x=5'
//   .split('\n')
const {points, folds} = testInput.reduce((acc, curr) => {
  if (curr.indexOf('fold') >= 0) {
    return {
      ...acc,
      folds: [...acc.folds, curr.slice(11).split('=')]
    }
  }
  const parsedPoint = curr.split(',').map(i => Number(i))
  if (parsedPoint.length !== 2) return acc
  return {
    ...acc,
    points: [
      ...acc.points,
      parsedPoint
    ]
  }
}, {points: [], folds: []})
console.log('points', points)
console.log('folds', folds)

console.log('POINTS', makeAFold(folds[0], points).length)

function makeAFold (fold, points) {
  let foldedPoints = []
  const [foldAlong, value] = fold
  if (foldAlong === 'x') {
    foldedPoints = foldLeft(Number(value), points)
  } else {
    foldedPoints = foldUp(Number(value), points)
  }
  return foldedPoints.filter((point, idx, self) =>
    self.findIndex(point2 => point2[0] === point[0] && point2[1] === point[1]) === idx)
}

function foldUp (value, points) {
  const {upperPoints, bottomPoints} = points.reduce((acc, curr) => {
    if (curr[1] >= value) {
      return {
        ...acc,
        bottomPoints: [...acc.bottomPoints, curr]
      }
    }
    return {
      ...acc,
      upperPoints: [...acc.upperPoints, curr]
    }
  }, {upperPoints: [], bottomPoints: []})
  const foldedOverPoints = bottomPoints.map(([pointX, pointY]) => [pointX, foldPoint(value, pointY)])

  return upperPoints.concat(foldedOverPoints)
}

function foldLeft (value, points) {
  const {leftPoints, rightPoints} = points.reduce((acc, curr) => {
    if (curr[0] >= value) {
      return {
        ...acc,
        rightPoints: [...acc.rightPoints, curr]
      }
    }
    return {
      ...acc,
      leftPoints: [...acc.leftPoints, curr]
    }
  }, {leftPoints: [], rightPoints: []})

  const foldedOverPoints = rightPoints.map(([pointX, pointY]) => [foldPoint(value, pointX), pointY])

  return leftPoints.concat(foldedOverPoints)
}

function foldPoint (foldLine, point) {
  const distanceFromFold = point - foldLine
  return foldLine - distanceFromFold
}
