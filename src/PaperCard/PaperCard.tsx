import React from 'react'
import styled from 'styled-components'
import { Card } from '../Card/Card'

// 1.4142

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
`

const CardWrapper = styled.div`
  width: 33.33%;
`

export const PaperCard = () => {
  return (
    <PaperContainer>
      <PrintableArea>
        <CardWrapper>
          <Card
            top={'1'}
            bottom={'2'}
            type='conflict'
          />
        </CardWrapper>
        <CardWrapper>
          <Card
            top={'1'}
            bottom={'2'}
            type='conflict'
          />
        </CardWrapper>
        <CardWrapper>
          <Card
            top={'1'}
            bottom={'2'}
            type='conflict'
          />
        </CardWrapper>
      </PrintableArea>
    </PaperContainer>
  )
}