import React, { Fragment } from 'react'
import styled from 'styled-components'
import { colors } from '../styles/colors'
import { twoSectionCards } from '../utils/constants'
import { backgroundsLibrary } from './backgrounds'

export type CardType = {
  bottom: string
  left?: string
  top: string
  right?: string
  type: string
}

type CardProps = CardType & {
  back: boolean
  quality: string
  selected: boolean
}

type CardContainerProps = {
  color: string
  selected: boolean
}

const CardContainer = styled.div<CardContainerProps>`
  width: 100%;
  padding-top: 100%;
  border: 1px solid black;
  margin: -1px;
  background: white;
  color: black;
  position: relative;
  ${({ color }) => color ? `color: ${ color };` : ''}
  ${({ selected }) => selected ? `
    border: 3px solid ${ colors.gold };
    margin: -3px;
    z-index: 1;
    @media print {
      border: 1px solid black;
      margin: -1px;
    };
  ` : ''}
`

const SideText = styled.div<{ twoSectorSetup: boolean }>`
  position: absolute;
  text-align: center;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 20%;
  overflow: hidden;
  line-height: 1em;
  font-family: 'Ubuntu';
  ${({ twoSectorSetup }) => twoSectorSetup ? `
    height: 30%;
    align-items: center;
    > div {
      padding: 0;
    }
  ` : ''}
`

const BottomContainer = styled(SideText)`
  left: 0;
  bottom: 7%;
`

const LeftContainer = styled(SideText)`
  top: 0;
  left: 7%;
  transform: rotate(90deg) translateX(-3em);
  transform-origin: bottom left;
`

const TopContainer = styled(SideText)`
  left: 0;
  top: 7%;
  transform: rotate(180deg);
`

const RightContainer = styled(SideText)`
  top: 0;
  right: 7%;
  transform: rotate(270deg) translateX(3em);
  transform-origin: bottom right;
`

const PaddedSideText = styled.div`
  -webkit-print-color-adjust: exact;
  width: 100%;
  padding: 0 12.5%;
  font-family: 'Josefin Sans', sans-serif;
  text-transform: uppercase;
  font-weight: 700;
`

const StyledBackImage = styled.img`
  -webkit-print-color-adjust: exact;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const displayNewLines = (text: string) => {
  return text.split('\n').map((item, key) => {
    return <Fragment key={key}>{item}<br/></Fragment>
  })
}

export const Card = ({
  bottom,
  left,
  top,
  right,
  type,
  quality,
  back,
  selected
}: CardProps) => {
  const color = quality === 'original' ? colors.white : colors.black
  const cardFace = back ? 'back' : 'front'
  const backgroundSrc = backgroundsLibrary[cardFace][quality][type]
  const twoSectorSetup = twoSectionCards.indexOf(type) !== -1
  return (
    <CardContainer color={color} selected={selected}>
      <StyledBackImage src={backgroundSrc} />
      <BottomContainer twoSectorSetup={twoSectorSetup}>
        <PaddedSideText>
          {displayNewLines(bottom)}
        </PaddedSideText>
      </BottomContainer>
      {left && (
        <LeftContainer twoSectorSetup={twoSectorSetup}>
          <PaddedSideText>
            {displayNewLines(left)}
          </PaddedSideText>
        </LeftContainer>
      )}
      <TopContainer twoSectorSetup={twoSectorSetup}>
        <PaddedSideText>
          {displayNewLines(top)}
        </PaddedSideText>
      </TopContainer>
      {right && (
        <RightContainer twoSectorSetup={twoSectorSetup}>
          <PaddedSideText>
            {displayNewLines(right)}
          </PaddedSideText>
        </RightContainer>
      )}
    </CardContainer>
  )
}
