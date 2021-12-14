const fs = require('fs')
const testInput = fs.readFileSync('./day-10/day10-1_input.txt', 'utf-8')
  .split('\n').map(i => i.split(''))

// const testInput = '[({(<(())[]>[[{[]{<()<>>\n[(()[<>])]({[<{<<[]>>(\n{([(<{}[<>[]}>{[]{[(<()>\n(((({<>}<{<{<>}{[]{[]{}\n[[<[([]))<([[{}[[()]]]\n[{[{({}]{}}([{[{{{}}([]\n{<[[]]>}<{[{[{[]{()[[[]\n[<(<(<(<{}))><([]([]()\n<{([([[(<>()){}]>(<<{{\n<{([{{}}[<[[[<>{}]]]>[]]\n'
//   .split('\n').map(i => i.split(''))

// console.log('T', testInput)

const incompleteRows = testInput.filter(row => {
  return !isRowCorrupted(row)
})

const scores = []

incompleteRows.forEach(row => {
  const unClosedChars = removeClosedChunks(row)
  const missingClosingTags = closeChunks(unClosedChars)
  scores.push(calculateLineScore(missingClosingTags))
})

scores.sort((a, b) => a - b)
const middle = Math.floor(scores.length / 2)
console.log('SCORE', scores[middle])

function calculateLineScore (characters) {
  let score = 0
  characters.forEach(char => {
    score *= 5
    switch (char) {
      case ')':
        score += 1
        break
      case ']':
        score += 2
        break
      case '}':
        score += 3
        break
      case '>':
        score += 4
        break
    }
  })
  return score
}

function closeChunks (row) {
  const addedChars = []
  row.forEach(char => {
    switch (char) {
      case '(':
        addedChars.unshift(')')
        break
      case '[':
        addedChars.unshift(']')
        break
      case '{':
        addedChars.unshift('}')
        break
      case '<':
        addedChars.unshift('>')
        break
    }
  })
  return addedChars
}

function isRowCorrupted (row) {
  const chars = []
  for (let char of row) {
    switch (char) {
      case '(':
      case '[':
      case '{':
      case '<':
        chars.push(char)
        break
      case ')':
        if (chars[chars.length - 1] !== '(') return true
        chars.pop()
        break
      case ']':
        if (chars[chars.length - 1] !== '[') return true
        chars.pop()
        break
      case '}':
        if (chars[chars.length - 1] !== '{') return true
        chars.pop()
        break
      case '>':
        if (chars[chars.length - 1] !== '<') return true
        chars.pop()
        break
      default:
        throw new Error(`Invalid char ${char}`)
    }
  }
  return false
}
function removeClosedChunks (row) {
  const chars = []
  row.forEach(char => {
    switch (char) {
      case '(':
      case '[':
      case '{':
      case '<':
        chars.push(char)
        break
      case ')':
      case ']':
      case '}':
      case '>':
        chars.pop()
        break
      default:
        throw new Error(`Invalid char ${char}`)
    }
  })
  return chars
}
