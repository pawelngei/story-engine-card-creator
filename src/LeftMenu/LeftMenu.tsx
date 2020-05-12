import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { CardType } from '../Card/Card'
import { colors } from '../styles/colors'
import { DisplayOptions } from '../App'

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
  border-right: 1px solid black;
  background: ${colors.navy};
  color: ${colors.white};
  @media print {
    display: none;
  }
`

const Inner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10%;
`

const CardActionsBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2em;
`

const InputContainer = styled.div``

const StyledTextarea = styled.textarea`
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
  padding-top: 1em;
  width: 100%;
`

const cardTypes = [
  'agent',
  'anchor',
  'aspect',
  'conflict',
  'engine'
]

const qualityOptions = [
  'white',
  'light',
  'dark'
]

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
    setCard({
      ...card,
      [key]: value
    })
  }
  const { displayBacks, quality } = displayOptions
  const displayLeftRifght = ['engine', 'conflict'].indexOf(type) === -1
  return (
    <LeftMenuContainer>
      <Inner>
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
              name='quality'
              value={quality}
              onChange={e => setDisplayOptions({
                ...displayOptions,
                quality: e.target.value
              })}
            >
              {qualityOptions.map((quality, i) => (
                <option key={`select-back-${i}`} value={quality}>{quality}</option>
              ))}
            </select>
          </ActionsLine>
        </PageActionsBar>
        <CardActionsBar>
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
        </CardActionsBar>
        <InputContainer>
          <select
            name='type'
            value={type}
            onChange={e => setCardValue(e)}
          >
            {cardTypes.map((type, i) => (
              <option key={`select-${i}`} value={type}>{type}</option>
            ))}
          </select>
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
      </Inner>
    </LeftMenuContainer>
  )
}
