const fs = require('fs')
const testInput = fs.readFileSync('./day-4/day4-1_input.txt', 'utf-8').split('\n')
// const testInput = fs.readFileSync('./day-4/day4-example_input.txt', 'utf-8').split('\n')

const [drawnNumbersInput, ...boardsInput] = testInput

const drawnNumbers = drawnNumbersInput.split(',')
let boards = []

for (let i = 0; i < boardsInput.length; i++) {
  if (boardsInput[i] === '') {
    continue
  }
  const slicedInputs = boardsInput.indexOf('', i) < 0 ? boardsInput.slice(i) : boardsInput.slice(i, boardsInput.indexOf('', i + 1))
  const board = slicedInputs.map(board => board.split(' ').filter(i => i !== ''))
  boards = [...boards, board]
  i += 5
}

const markedBoards = {}
let winningBoard
let lastNumberDrawn

for (let i = 0; i < drawnNumbers.length; i++) {
  winningBoard = markBoards(drawnNumbers[i])
  if (winningBoard) {
    lastNumberDrawn = drawnNumbers[i]
    break
  }
}

const neededNumbers = drawnNumbers.slice(0, drawnNumbers.indexOf(lastNumberDrawn) + 1)
const unmarkedNumbers = winningBoard.flatMap(i => i).filter(number => !neededNumbers.includes(number))

const sumOfUnmarked = unmarkedNumbers.reduce((acc, curr) => {
  return acc + Number(curr)
}, 0)

console.log('Result', sumOfUnmarked * lastNumberDrawn)

function markBoards (number) {
  let winningBoard
  boards.forEach((board, idx) => {
    if (markedBoards[idx] === undefined) {
      markedBoards[idx] = {
        row0: 0,
        row1: 0,
        row2: 0,
        row3: 0,
        row4: 0,
        col0: 0,
        col1: 0,
        col2: 0,
        col3: 0,
        col4: 0
      }
    }
    board.forEach((row, rowIdx) => {
      const colIdx = row.indexOf(number)
      if (colIdx > -1) {
        markedBoards[idx][`row${rowIdx}`] += 1
        markedBoards[idx][`col${colIdx}`] += 1
      }
      if (
        markedBoards[idx][`row${rowIdx}`] === 5 ||
        markedBoards[idx][`col${colIdx}`] === 5) {
        winningBoard = boards[idx]
      }
    })
  })
  return winningBoard
}
