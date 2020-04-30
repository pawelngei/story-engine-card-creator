import React from 'react'
import styled from 'styled-components'
import { ReactComponent as AnchorSvg } from './anchor.svg'

type CardProps = {
  bottom: string
  left: string
  top: string
  right: string
  symbol?: string
}

const CardContainer = styled.div`
  width: 100%;
  padding-top: 100%;
  border: 1px solid black;
  background: white;
  color: black;
  position: relative;
`

const TextContainer = styled.span`
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

const BottomContainer = styled(TextContainer)`
  left: 0;
  bottom: 5%;
`

const LeftContainer = styled(TextContainer)`
  top: 2.5%;
  left: 5%;
  transform: rotate(90deg) translateX(-3em);
  transform-origin: bottom left;
`

const TopContainer = styled(TextContainer)`
  left: 0;
  top: 5%;
  transform: rotate(180deg);
`

const RightContainer = styled(TextContainer)`
  top: 2.5%;
  right: 5%;
  transform: rotate(270deg) translateX(3em);
  transform-origin: bottom right;
`

export const Card = ({
  bottom,
  left,
  top,
  right
}: CardProps) => {
  return (
    <CardContainer>
      <BottomContainer>{bottom}</BottomContainer>
      <LeftContainer>{left}</LeftContainer>
      <TopContainer>{top}</TopContainer>
      <RightContainer>{right}</RightContainer>
    </CardContainer>
  )
}