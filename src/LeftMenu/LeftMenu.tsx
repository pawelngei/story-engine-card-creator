import React, { useState } from 'react'
import styled from 'styled-components'
import { Card } from '../Card/Card'

const LeftMenuContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 30%;
  border-right: 1px solid black;
  background: gray;
`

const Inner = styled.div`
  position: relative;
  display: inline-block;
  width: 80%;
  background: teal;
  padding-top: 10%;
`

const CardContainer = styled.div`
  display: inline-block;
  width: 80%;
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

export const LeftMenu = () => {
  const [bottom, setBottom] = useState('bottom')
  const [top, setTop] = useState('top')
  const [left, setLeft] = useState('left')
  const [right, setRight] = useState('right')
  const [type, setType] = useState('agent')
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
            onChange={e => setBottom(e.target.value)}
          />
          <StyledInput
            value={top}
            onChange={e => setTop(e.target.value)}
          />
          <StyledInput
            value={left}
            onChange={e => setLeft(e.target.value)}
          />
          <StyledInput
            value={right}
            onChange={e => setRight(e.target.value)}
          />
          <select onChange={e => setType(e.target.value)}>
            {cardTypes.map((type, i) => (
              <option key={`select-${i}`} value={type}>{type}</option>
            ))}
          </select>
        </InputContainer>
      </Inner>
    </LeftMenuContainer>
  )
}
