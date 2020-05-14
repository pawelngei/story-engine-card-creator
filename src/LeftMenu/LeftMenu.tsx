import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { CardType } from '../Card/Card'
import { colors } from '../styles/colors'
import {
  typeOptions,
  twoSectionCards,
  Quality,
  frontQualityOptions,
  backQualityOptions
} from '../utils/constants'
import { DisplayOptions } from '../App'
import LogoPng from './logo.png'

type LeftMenuProps = {
  card: CardType,
  setCard: (card: CardType) => void
  createNewCard: () => void
  deleteCard: () => void
  exportCards: () => void
  importCards: (e: React.ChangeEvent<HTMLInputElement>) => void
  clearCards: () => void
  displayOptions: DisplayOptions
  setDisplayOptions: (displayOptions: DisplayOptions) => void
}

const LeftMenuContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 700px;
  border-right: 1px solid black;
  background: ${colors.navy};
  color: ${colors.white};
  overflow: auto;
  @media print {
    display: none;
  }
`

const InnerContainer = styled.div`
  padding: 70px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 500;
  a {
    text-decoration: none;
    color: ${ colors.gold };
  }
`

const SectionContainer = styled.div`
  padding: 28px 0;
  width: 100%;
  border-bottom: 2px solid ${colors.white};
  &:first-of-type {
    padding-top: 0;
  }
  &:last-of-type {
    padding-bottom: 0;
  }
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`

const Title = styled.h1`
  font-weight: 700;
  font-size: 2.2em;
`

const Logo = styled.img`
  width: 160px;
  height: 160px;
  margin-right: 20px;
`

const InfoContainer = styled.div`
  font-size: 1.2em;
`

const Subtitle = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
`

const ButtonLine = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 28px;
`

const SelectLine = styled.div`
  font-size: 1.2em;
  margin-bottom: 8px;
`

const InputContainer = styled.div``

const StyledTextarea = styled.textarea`
  font-family: 'Josefin Sans', sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  width: 100%;
`

const PageActionsBar = styled.div`
  margin-bottom: 2em;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const ActionsLine = styled.div`
  width: 100%;
`

export const LeftMenu = ({
  card,
  setCard,
  createNewCard,
  deleteCard,
  exportCards,
  importCards,
  clearCards,
  displayOptions,
  setDisplayOptions,
}: LeftMenuProps) => {
  const { top, bottom, left, right, type } = card
  const setCardValue = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = event.target.value
    const key = event.target.name
    const otherOptions = key === 'type' && twoSectionCards.indexOf(value) !== -1
      ? { left: '', right: '' }
      : {}
    setCard({
      ...card,
      [key]: value,
      ...otherOptions
    })
  }
  const { displayBacks, backQuality, frontQuality } = displayOptions
  const displayLeftRifght = twoSectionCards.indexOf(type) === -1
  return (
    <LeftMenuContainer>
      <InnerContainer>
        <SectionContainer>
          <LogoContainer>
            <Logo src={LogoPng} />
            <Title>
              <em>
                THE STORY ENGINE
              </em>
              <br />
              CARD CREATOR
            </Title>
          </LogoContainer>
          <InfoContainer>
            Learn more about <em>The Story Engine</em> at <a href="https://storyenginedeck.com/">storyenginedeck.com</a>.
          </InfoContainer>
        </SectionContainer>
        <SectionContainer>
          <Subtitle>Create Cards</Subtitle>
          <ButtonLine>
            <Button
              variant="contained"
              color="primary"
              onClick={() => createNewCard()}
            >
              Create new card
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => deleteCard()}
            >
              Delete this card
            </Button>
          </ButtonLine>
          <SelectLine>
            Card type:&nbsp;
            <select
              name='type'
              value={type}
              onChange={e => setCardValue(e)}
            >
              {typeOptions.map((option, i) => (
                <option
                  key={`select-${i}`}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </SelectLine>
          <InputContainer>
            <StyledTextarea
              name='bottom'
              placeholder='bottom'
              value={bottom}
              onChange={e => setCardValue(e)}
            />
            <StyledTextarea
              name='top'
              placeholder='top'
              value={top}
              onChange={e => setCardValue(e)}
            />
            {displayLeftRifght ? (
              <>
                <StyledTextarea
                  name='left'
                  placeholder='left'
                  value={left}
                  onChange={e => setCardValue(e)}
                />
                <StyledTextarea
                  name='right'
                  placeholder='right'
                  value={right}
                  onChange={e => setCardValue(e)}
                />
              </>
            ) : null}
          </InputContainer>
        </SectionContainer>
        <PageActionsBar>
          <Button 
            variant="contained"
            color="primary"
            onClick={() => clearCards()}
          >
            Clear Cards
          </Button>
          <Button 
            variant="contained"
            color="primary"
            onClick={() => window.print()}
          >
            Print Cards
          </Button>
          <Button 
            variant="contained"
            color="primary"
            onClick={() => exportCards()}
          >
            Export Cards
          </Button>
          <Button
            variant="contained"
            color="primary"
            component="label"
          >
            Import Cards
            <input
              type="file"
              style={{ display: "none" }}
              onChange={e => importCards(e)}
            />
          </Button>
          <ActionsLine>
            <input
              type="checkbox"
              id="backs"
              name="backs"
              checked={displayBacks}
              onChange={() => setDisplayOptions({
                ...displayOptions,
                displayBacks: !displayBacks
              })}
            />
            <label htmlFor="backs">
              Display Card Backs
            </label>
          </ActionsLine>
          <ActionsLine>
            Card Back Quality:
            <select
              name='backQuality'
              value={backQuality}
              onChange={e => setDisplayOptions({
                ...displayOptions,
                backQuality: e.target.value as Quality
              })}
            >
              {backQualityOptions.map((option, i) => (
                <option
                  key={`select-back-${i}`}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </ActionsLine>
          <ActionsLine>
            Card Front Quality:
              <select
                name='frontQuality'
                value={frontQuality}
                onChange={e => setDisplayOptions({
                  ...displayOptions,
                  frontQuality: e.target.value as Quality
                })}
              >
                {frontQualityOptions.map((option, i) => (
                  <option
                    key={`select-back-${i}`}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
          </ActionsLine>
        </PageActionsBar>
      </InnerContainer>
    </LeftMenuContainer>
  )
}
