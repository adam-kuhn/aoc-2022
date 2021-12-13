const fs = require('fs')
const testInput = fs.readFileSync('./day-10/day10-1_input.txt', 'utf-8')
  .split('\n').map(i => i.split(''))

// const testInput = '[({(<(())[]>[[{[]{<()<>>\n[(()[<>])]({[<{<<[]>>(\n{([(<{}[<>[]}>{[]{[(<()>\n(((({<>}<{<{<>}{[]{[]{}\n[[<[([]))<([[{}[[()]]]\n[{[{({}]{}}([{[{{{}}([]\n{<[[]]>}<{[{[{[]{()[[[]\n[<(<(<(<{}))><([]([]()\n<{([([[(<>()){}]>(<<{{\n<{([{{}}[<[[[<>{}]]]>[]]\n'
//   .split('\n').map(i => i.split(''))

// console.log('T', testInput)

const score = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
}
const errors = {
  ')': 0,
  ']': 0,
  '}': 0,
  '>': 0
}

const totalScore = () => {
  const paranScore = score[')'] * errors[')']
  const squareScore = score[']'] * errors[']']
  const brackScore = score['}'] * errors['}']
  const htmlScore = score['>'] * errors['>']
  return paranScore + squareScore + brackScore + htmlScore
}

testInput.forEach(row => {
  parseRow(row)
})

function parseRow (row) {
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
        if (chars[chars.length - 1] !== '(') errors[char]++
        chars.pop()
        break
      case ']':
        if (chars[chars.length - 1] !== '[') errors[char]++
        chars.pop()
        break
      case '}':
        if (chars[chars.length - 1] !== '{') errors[char]++
        chars.pop()
        break
      case '>':
        if (chars[chars.length - 1] !== '<') errors[char]++
        chars.pop()
        break
      default:
        throw new Error(`Invalid char ${char}`)
    }
  })
}

console.log('TOTAL', totalScore())
