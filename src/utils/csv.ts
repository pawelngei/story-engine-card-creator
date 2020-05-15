import { CardType } from '../Card/Card'

const nlRegex = /\n/gi
const pipeRegex = /\|/gi

const newLineToPipe = (str: string) => (str || '').replace(nlRegex, '|')
const pipeToNewLine = (str: string) => (str || '').replace(pipeRegex, '\n')

export const exportCSV = (cards: CardType[]) => {
  const cardRows = cards.map(card => ([
    card.type, card.bottom, card.top, card.left, card.right
  ]))
  const csvContent = 'Type,Bottom,Top,Left,Right\n'
    + cardRows.map(e => newLineToPipe(e.join(","))).join("\n")
  return csvContent
}

export const importCSV = (csvContent: string) => {
  const csvRows = csvContent.split('\n')
  const cards = csvRows.slice(1).map(row => {
    const columns = row.split(',')
    const card = {
      type: columns[0],
      bottom: pipeToNewLine(columns[1]),
      top: pipeToNewLine(columns[2]),
      left: pipeToNewLine(columns[3]),
      right: pipeToNewLine(columns[4])
    }
    return card
  })
  return cards
}