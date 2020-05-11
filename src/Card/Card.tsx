import React from 'react'
import styled from 'styled-components'
import { colors } from '../styles/colors'
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
}

const CardContainer = styled.div<{color?: string}>`
  width: 100%;
  padding-top: 100%;
  border: 1px solid black;
  margin: -1px;
  background: white;
  color: black;
  position: relative;
  ${({ color }) => color ? `color: ${ color };` : ''}
`

const SideText = styled.div`
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
`

const BottomContainer = styled(SideText)`
  left: 0;
  bottom: 5%;
`

const LeftContainer = styled(SideText)`
  top: -2.5%;
  left: 5%;
  transform: rotate(90deg) translateX(-3em);
  transform-origin: bottom left;
`

const TopContainer = styled(SideText)`
  left: 0;
  top: 5%;
  transform: rotate(180deg);
`

const RightContainer = styled(SideText)`
  top: -2.5%;
  right: 5%;
  transform: rotate(270deg) translateX(3em);
  transform-origin: bottom right;
`

const PaddedSideText = styled.div`
  width: 100%;
  padding: 0 12.5%;
`

const StyledBackImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export const Card = ({
  bottom,
  left,
  top,
  right,
  type,
  quality,
  back
}: CardProps) => {
  const color = quality === 'dark' ? colors.white : colors.black
  const cardFace = back ? 'back' : 'front'
  const backgroundSrc = backgroundsLibrary[cardFace][quality][type]
  return (
    <CardContainer color={color}>
      <StyledBackImage src={backgroundSrc} />
      <BottomContainer>
        <PaddedSideText>
          {bottom}
        </PaddedSideText>
      </BottomContainer>
      {left && (
        <LeftContainer>
          <PaddedSideText>
            {left}
          </PaddedSideText>
        </LeftContainer>
      )}
      <TopContainer>
        <PaddedSideText>
          {top}
        </PaddedSideText>
      </TopContainer>
      {right && (
        <RightContainer>
          <PaddedSideText>
            {right}
          </PaddedSideText>
        </RightContainer>
      )}
    </CardContainer>
  )
}
