const fs = require('fs')
const testInput = fs.readFileSync('./day-14/day14-1_input.txt', 'utf-8').split('\n')

const [startingSequence, , ...rules] = testInput

const parsedRules = rules.reduce((acc, curr) => {
  const [pair, insert] = curr.split(' -> ')
  return {
    ...acc,
    [pair]: insert
  }
}, {})

let chain = startingSequence.split('')
for (let day = 0; day < 10; day++) {
  for (let i = 0; i < chain.length; i++) {
    const currentPolymer = chain[i]
    const nextPolymer = chain[i + 1]
    if (!nextPolymer) continue
    const pair = currentPolymer + nextPolymer
    const polymerToInsert = parsedRules[pair]
    if (polymerToInsert) {
      chain.splice(i + 1, 0, polymerToInsert)
      i++
    }
  }
}

const uniqueElements = chain.filter((item, idx, self) => idx === self.indexOf(item))
let mostCommon
let leastCommon
uniqueElements.forEach(element => {
  const count = chain.filter(i => i === element).length
  if (!mostCommon) mostCommon = count
  if (!leastCommon) leastCommon = count
  if (mostCommon < count) mostCommon = count
  if (leastCommon > count) leastCommon = count
})

console.log('CHAiN L', chain.length)
console.log('MOST', mostCommon)
console.log('LEAST', leastCommon)
console.log('DIF', mostCommon - leastCommon)
