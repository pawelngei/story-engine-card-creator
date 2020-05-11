import React from 'react'
import styled from 'styled-components'
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
  return (
    <LeftMenuContainer>
      <Inner>
        <PageActionsBar>
          <button onClick={() => clearCards()}>Clear Cards</button>
          <button onClick={() => window.print()}>Print Cards</button>
          <button onClick={() => exportCards()}>Export Cards</button>
          <ActionsLine>
            Import:
            <input type="file" name="file" onChange={e => importCards(e)}/>
          </ActionsLine>
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
          <button onClick={() => createNewCard()}>
            Create new card
          </button>
          <button onClick={() => deleteCard()}>
            Delete this card
          </button>
        </CardActionsBar>
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
          <select
            name='type'
            value={type}
            onChange={e => setCardValue(e)}
          >
            {cardTypes.map((type, i) => (
              <option key={`select-${i}`} value={type}>{type}</option>
            ))}
          </select>
        </InputContainer>
      </Inner>
    </LeftMenuContainer>
  )
}
