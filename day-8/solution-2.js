const fs = require('fs')
const testInput = fs.readFileSync('./day-8/day8-1_input.txt', 'utf-8')
  .split('\n')
  .map(i => {
    const [input, output] = i.split('|')
    return {
      input: input.split(' ').filter(i => !!i).map(i => i.split('')),
      output: output.split(' ').filter(i => !!i)
    }
  })

// const testInput = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf'.split('\n')
//   .map(i => {
//     const [input, output] = i.split('|')
//     return {
//       input: input.split(' ').filter(i => !!i).map(i => i.split('')),
//       output: output.split(' ').filter(i => !!i)
//     }
//   })
let outputs = []

testInput.forEach((set) => {
  const arrangement = {top: null, topLeft: null, topRight: null, mid: null, bottomLeft: null, bottomRight: null, bottom: null}
  const uniques = getUniqueSignals(set.input)
  arrangement.top = findTop(uniques)
  arrangement.topRight = uniques.oneSignal
  arrangement.bottomLeft = uniques.oneSignal
  analyzeFour(uniques.fourSignal, uniques.oneSignal)

  function analyzeFour (four, one) {
    const midOrTopLeft = four.filter(i => !one.includes(i))
    arrangement.mid = midOrTopLeft
    arrangement.topLeft = midOrTopLeft
  }
  // 0, 6, 9
  const sixSignalDigits = set.input.filter(i => i.length === 6)
  const sixDigit = sixSignalDigits.filter(signal =>
    !uniques.oneSignal.every(oneSignal => signal.includes(oneSignal)))[0]
  const getRightSideFromSixAndOne = () => {
    if (sixDigit.includes(uniques.oneSignal[0])) {
      arrangement.bottomRight = uniques.oneSignal[0]
      arrangement.topRight = uniques.oneSignal[1]
    } else {
      arrangement.bottomRight = uniques.oneSignal[1]
      arrangement.topRight = uniques.oneSignal[0]
    }
  }
  getRightSideFromSixAndOne() // have top, top-right, bottom-right => and possible mid/top-left
  const zeroOrNine = sixSignalDigits.filter(signal => signal.join('') !== sixDigit.join(''))
  const nineDigit = zeroOrNine.filter(signal => arrangement.mid.every(i => signal.includes(i)))[0]
  const zerorDigit = zeroOrNine.filter(signal => signal.join('') !== nineDigit.join(''))[0]
  const findMidAndTopLeft = () => {
    const topLeft = zerorDigit.filter(i => arrangement.mid.includes(i))
    const mid = nineDigit.filter(i => arrangement.mid.includes(i))
    arrangement.topLeft = topLeft
    arrangement.mid = mid
  }
  findMidAndTopLeft() // have top, top-right, bottom-right, mid, top-left
  // 2, 3, 5
  const fiveSignalDigits = set.input.filter(i => i.length === 5)
  // if it is missing top right it is a 5 => gives us bottom
  const fiveDigit = fiveSignalDigits.filter(signal => !signal.includes(arrangement.topRight))[0]
  const findBottom = () => {
    const knownSignals = Object.values(arrangement).filter(i => !!i)
    const bottom = fiveDigit.filter(i => !knownSignals.includes(i))
    arrangement.bottom = bottom
  }
  findBottom() // have top, top-right, bottom-right, mid, top-left, bottom

  // if it is missing bottom right and/or top left it is a 2 => have analyzed 5 can get bottom left
  const twoDigit = fiveSignalDigits.filter(signal => !signal.includes(arrangement.bottomRight))[0]

  const findBottomLeft = () => {
    const knownSignals = Object.values(arrangement).filter(i => !!i)
    const bottomLeft = twoDigit.filter(i => !knownSignals.includes(i))
    arrangement.bottomLeft = bottomLeft
  }
  findBottomLeft() // arrangement complete
  const threeDigit = fiveSignalDigits.filter(signal => signal.join('') !== twoDigit.join('') && signal.join('') !== fiveDigit.join(''))[0]

  const digits = {
    oneDigit: uniques.oneSignal.sort().join(''),
    twoDigit: twoDigit.sort().join(''),
    threeDigit: threeDigit.sort().join(''),
    fourDigit: uniques.fourSignal.sort().join(''),
    fiveDigit: fiveDigit.sort().join(''),
    sixDigit: sixDigit.sort().join(''),
    sevenDigit: uniques.sevenSignal.sort().join(''),
    eightDigit: uniques.eightSignal.sort().join(''),
    nineDigit: nineDigit.sort().join(''),
    zeroDigit: zerorDigit.sort().join('')
  }
  parseOutput(digits, set.output)
})

function getUniqueSignals (signals) {
  const oneSignal = signals.filter(i => i.length === 2)[0]
  const fourSignal = signals.filter(i => i.length === 4)[0]
  const sevenSignal = signals.filter(i => i.length === 3)[0]
  const eightSignal = signals.filter(i => i.length === 7)[0]
  return {
    oneSignal, fourSignal, sevenSignal, eightSignal
  }
}

function findTop (uniqueSignals) {
  const top = uniqueSignals.sevenSignal.filter(i => !uniqueSignals.oneSignal.includes(i))
  return top
}

function parseOutput (digits, outputSignal) {
  const digitKeys = Object.keys(digits)
  const digitValues = Object.values(digits)
  const digitOutput = outputSignal.map(signal => {
    const arrangedSignal = signal.split('').sort().join('')
    const index = digitValues.indexOf(arrangedSignal)
    const digitKey = digitKeys[index]
    return digitKey
  })
  let numericOutput = ''
  digitOutput.forEach(digit => {
    switch (digit) {
      case 'oneDigit': {
        numericOutput += '1'
        break
      }
      case 'twoDigit': {
        numericOutput += '2'
        break
      }
      case 'threeDigit': {
        numericOutput += '3'
        break
      }
      case 'fourDigit': {
        numericOutput += '4'
        break
      }
      case 'fiveDigit': {
        numericOutput += '5'
        break
      }
      case 'sixDigit': {
        numericOutput += '6'
        break
      }
      case 'sevenDigit': {
        numericOutput += '7'
        break
      }
      case 'eightDigit': {
        numericOutput += '8'
        break
      }
      case 'nineDigit': {
        numericOutput += '9'
        break
      }
      case 'zeroDigit': {
        numericOutput += '0'
        break
      }
      default:
        throw new Error(`Invalid digit ${digit}`)
    }
  })
  outputs.push(Number(numericOutput))
}

const sum = outputs.reduce((acc, curr) => acc + curr, 0)
console.log('SUM', sum)
// need the sum of the outputs

// do seven and 1 to confirm top and right side
// do 4 to confirm potential mid and top left
/*
// check 6 signals digits
- if all 3 from 7 and 1 (top, right-top, left-top) present => 0, or 9
- if one mmissing its a 6
    if it is a 6 => can confirm right side order

- from 4
- confirm top-left
- and thereby confirm mid
  - when mid is confirmed => you can identify 0

- check 5 signals

*/

// need to find the unique digits and then determin the order of the wires
// where does the code shine
// UNIQUE
// seven (3 signals) - top, right-top, right-bottom => with 1 confirms top
// one (2 signals) - right-top, right-bottom => CONFIRMS RIGHT SIDE
// four (4 signals) - left-top, mid, right-top, right-bottom
// eight - all segments

// Other
// zero (6 signals) - all but middle
// two (5 signals) - all but top-left, bottom-right
// three (5 signals) - all but left side => "ONE" confirms the left side
// five (5 signals) -  all but top-right, bottom-left
// six (6 signals) - all but top right
// nine (6 signals) - all but bottom left

/*
  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg
 */
