import React from 'react'
import styled from 'styled-components'
import { ReactComponent as AnchorSvg } from './anchor.svg'
import { ReactComponent as MaskSvg } from './mask.svg'
import { ReactComponent as PersonSvg } from './person.svg'
import { ReactComponent as CogSvg } from './cog.svg'
import { ReactComponent as StormSvg } from './storm.svg'

export type CardType = {
  bottom: string
  left?: string
  top: string
  right?: string
  type: string
}

type IconTableType = {
  [id: string]: {
    alt: string
    component: React.ReactNode
  }
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
  top: -2.5%;
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
  top: -2.5%;
  right: 5%;
  transform: rotate(270deg) translateX(3em);
  transform-origin: bottom right;
`

const SymbolContainer = styled.div`
  position: absolute;
  height: 30%;
  width: 30%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const StyledIcon = styled.svg`
  width: 100%;
  height: 100%;
`

const AnchorIcon = StyledIcon.withComponent(AnchorSvg)
const MaskIcon = StyledIcon.withComponent(MaskSvg)
const PersonIcon = StyledIcon.withComponent(PersonSvg)
const CogIcon = StyledIcon.withComponent(CogSvg)
const StormIcon = StyledIcon.withComponent(StormSvg)

const IconTable: IconTableType = {
  agent: {
    alt: "Icons made by https://www.flaticon.com/authors/freepik Freepik from https://www.flaticon.com/",
    component: PersonIcon
  },
  anchor: {
    alt: "Icons made by https://www.flaticon.com/authors/freepik Freepik from https://www.flaticon.com/",
    component: AnchorIcon
  },
  aspect: {
    alt: "Icons made by https://www.flaticon.com/authors/freepik Freepik from https://www.flaticon.com/",
    component: MaskIcon
  },
  conflict: {
    alt: "Icons made by https://www.flaticon.com/authors/freepik Freepik from https://www.flaticon.com/",
    component: StormIcon
  },
  engine: {
    alt: "Icons made by https://www.flaticon.com/authors/freepik Freepik from https://www.flaticon.com/",
    component: CogIcon
  },
}

export const Card = ({
  bottom,
  left,
  top,
  right,
  type
}: CardType) => {
  const symbol = type && IconTable[type]
  return (
    <CardContainer>
      <BottomContainer>{bottom}</BottomContainer>
      {left && <LeftContainer>{left}</LeftContainer>}
      <TopContainer>{top}</TopContainer>
      {right && <RightContainer>{right}</RightContainer>}
      {symbol && (
        <SymbolContainer title={symbol.alt}>
          {type === 'agent' && <PersonIcon />}
          {type === 'anchor' && <AnchorIcon />}
          {type === 'aspect' && <MaskIcon />}
          {type === 'conflict' && <StormIcon />}
          {type === 'engine' && <CogIcon />}
        </SymbolContainer>
      )}
    </CardContainer>
  )
}