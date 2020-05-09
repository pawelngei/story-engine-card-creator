import React from 'react'
import styled from 'styled-components'
import { Card, CardType } from '../Card/Card'

type PaperCardProps = {
  cards: CardType[]
  setActiveCard: (index: number) => void
  offsetIndex?: number
  backs?: boolean
  backQuality?: string
}

const PaperContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 141.42%;
  border: 1px solid black;
  @media print {
    border: none;
  }
`

const PrintableArea = styled.div<{ reversed: boolean }>`
  position: absolute;
  border: 1px dotted black;
  top: 5%;
  left: 5%;
  width: 90%;
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ reversed }) => reversed ? 'row-reverse' : 'row' };
  align-content: flex-start;
`

const CardWrapper = styled.div`
  width: 33.33%;
`

const makeBack = (type: string) => {
  const name = type.toUpperCase()
  return {
    type,
    top: name,
    bottom: name,
    left: name,
    right: name
  }
}

export const PaperCard = ({
  cards,
  setActiveCard,
  offsetIndex = 0,
  backQuality,
  backs
}: PaperCardProps) => {
  const displayedCards = backs ? cards.map(c => makeBack(c.type)) : cards
  return (
    <PaperContainer>
      <PrintableArea reversed={!!backs}>
        {displayedCards.map((card, index) => (
          <CardWrapper
            key={`cardwrapper-${index}`}
            onClick={() => setActiveCard(offsetIndex + index)}
          >
            <Card backQuality={backQuality} {...card} />
          </CardWrapper>
        ))}
      </PrintableArea>
    </PaperContainer>
  )
}