import { CardType } from '../Card/Card'

export const exportCSV = (cards: CardType[]) => {
  const cardRows = cards.map(card => ([
    card.type, card.bottom, card.top, card.left, card.right
  ]))
  const csvContent = 'Type,Bottom,Top,Left,Right\n'
    + cardRows.map(e => e.join(",")).join("\n")
  return csvContent
}

export const importCSV = (csvContent: string) => {
  const csvRows = csvContent.split('\n')
  const cards = csvRows.slice(1).map(row => {
    const columns = row.split(',')
    const card = {
      type: columns[0],
      bottom: columns[1],
      top: columns[2],
      left: columns[3],
      right: columns[4]
    }
    return card
  })
  return cards
}