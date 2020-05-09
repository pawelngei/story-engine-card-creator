import React from 'react'
import styled from 'styled-components'
import { colors } from '../styles/colors'
import { ReactComponent as AnchorSvg } from './anchor.svg'
import { ReactComponent as MaskSvg } from './mask.svg'
import { ReactComponent as PersonSvg } from './person.svg'
import { ReactComponent as CogSvg } from './cog.svg'
import { ReactComponent as StormSvg } from './storm.svg'
import AgentHQ from './backs/back-agent.jpg'
import AnchorHQ from './backs/back-anchor.jpg'
import AspectHQ from './backs/back-aspect.jpg'
import ConflictHQ from './backs/back-conflict.jpg'
import EngineHQ from './backs/back-engine.jpg'

export type CardType = {
  bottom: string
  left?: string
  top: string
  right?: string
  type: string
}

type CardProps = CardType & {
  backQuality?: string
}

type ImageDictionaryType = {
  [key: string]: string
}

const hqImageDictionary: ImageDictionaryType = {
  agent: AgentHQ,
  anchor: AnchorHQ,
  aspect: AspectHQ,
  conflict: ConflictHQ,
  engine: EngineHQ
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

const StyledBackImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const ImageCard = ({ type }: { type: string }) => {
  return (
    <CardContainer>
      <StyledBackImage src={hqImageDictionary[type]} />
    </CardContainer>
  )
}

const TextCard = ({
  bottom,
  left,
  top,
  right,
  type,
  backQuality
}: CardProps) => {
  const alt = 'Icons made by https://www.flaticon.com/authors/freepik Freepik from https://www.flaticon.com/'
  const color = backQuality === 'color' ? colors[type] : colors.black
  return (
    <CardContainer color={color}>
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
      <SymbolContainer title={alt}>
        {type === 'agent' && <PersonIcon />}
        {type === 'anchor' && <AnchorIcon />}
        {type === 'aspect' && <MaskIcon />}
        {type === 'conflict' && <StormIcon />}
        {type === 'engine' && <CogIcon />}
      </SymbolContainer>
    </CardContainer>
  )
}

export const Card = (props: CardProps) => {
  if (props?.backQuality === 'img-color') {
    return <ImageCard type={props.type} />
  }
  return <TextCard {...props} />
}
