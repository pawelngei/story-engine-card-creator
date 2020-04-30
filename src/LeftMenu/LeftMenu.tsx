import React, { useState } from 'react'
import styled from 'styled-components'
import { Card, CardType } from '../Card/Card'

type LeftMenuProps = {
  card: CardType,
  setCard: (card: CardType) => void
}

const LeftMenuContainer = styled.div`
  position: relative;
  height: 100vh;
  border-right: 1px solid black;
  background: gray;
  @media print {
    display: none;
  }
`

const Inner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: teal;
  padding: 10%;
`

const CardContainer = styled.div`
  width: 100%;
`

const InputContainer = styled.div`
  margin-top: 4em;
`

const StyledInput = styled.input`
  width: 100%;
`

const cardTypes = [
  'agent',
  'anchor',
  'aspect',
  'conflict',
  'engine'
]

export const LeftMenu = ({
  card,
  setCard
}: LeftMenuProps) => {
  const { top, bottom, left, right, type } = card
  const setCardValue = (key: string, value: string) => setCard({
    ...card,
    [key]: value
  })
  return (
    <LeftMenuContainer>
      <Inner>
        <CardContainer>
          <Card 
            bottom={bottom}
            top={top}
            left={left}
            right={right}
            type={type}
          />
        </CardContainer>
        <InputContainer>
          <StyledInput
            value={bottom}
            onChange={e => setCardValue('bottom', e.target.value)}
          />
          <StyledInput
            value={top}
            onChange={e => setCardValue('top', e.target.value)}
          />
          <StyledInput
            value={left}
            onChange={e => setCardValue('left', e.target.value)}
          />
          <StyledInput
            value={right}
            onChange={e => setCardValue('right', e.target.value)}
          />
          <select onChange={e => setCardValue('type', e.target.value)}>
            {cardTypes.map((type, i) => (
              <option key={`select-${i}`} value={type}>{type}</option>
            ))}
          </select>
        </InputContainer>
      </Inner>
    </LeftMenuContainer>
  )
}
