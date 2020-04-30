import React from 'react'
import styled from 'styled-components'
import { Card, CardType } from '../Card/Card'

type PaperCardProps = {
  cards: CardType[]
  setActiveCard: (index: number) => void
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

const PrintableArea = styled.div`
  position: absolute;
  border: 1px dotted black;
  top: 5%;
  left: 5%;
  width: 90%;
  height: 90%;
  display: flex;
  flex-wrap: wrap;
`

const CardWrapper = styled.div`
  width: 33.33%;
`

export const PaperCard = ({ cards, setActiveCard }: PaperCardProps) => {
  return (
    <PaperContainer>
      <PrintableArea>
        {cards.map((card, index) => (
          <CardWrapper
            key={`cardwrapper-${index}`}
            onClick={() => setActiveCard(index)}
          >
            <Card {...card} />
          </CardWrapper>
        ))}
      </PrintableArea>
    </PaperContainer>
  )
}