import '@openfonts/josefin-sans_all'
import React, { useState } from 'react'
import { CardType } from './Card/Card'
import { PagesManager } from './PagesManager/PagesManager'
import { LeftMenu } from './LeftMenu/LeftMenu'
import { MobilePlaceholder } from './MobilePlaceholder/MobilePlaceholder'
import styled from 'styled-components'
import { exportCSV, importCSV } from './utils/csv'
import {
  emptyCard,
  sampleCard,
  defaultOptions,
  Quality
} from './utils/constants'

export type DisplayOptions = {
  displayBacks: boolean,
  frontQuality: Quality
  backQuality: Quality
}

const AppContainer = styled.div`
  display: block;
`

const TabletDesktopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  @media (max-width: 767px) {
    display: none;
  }
  @media print {
    display: flex;
  }
`

const App = () => {
  const savedCards = JSON.parse(window.localStorage.getItem('cards') || 'null')
  const savedOptions = JSON.parse(
    window.localStorage.getItem('displayOptions') || 'null')
  const [cards, setCards] = useState<CardType[]>(
    savedCards || [sampleCard]
  )
  const [activeCardIdx, setActiveCardIdx] = useState(0)
  const [displayOptions, setDisplayOptions] = useState<DisplayOptions>(
    savedOptions || defaultOptions
  )
  const setAndSaveCards = (cards: CardType[]) => {
    setCards(cards)
    window.localStorage.setItem('cards', JSON.stringify(cards))
  }
  const setAndSaveOptions = (options: DisplayOptions) => {
    setDisplayOptions(options)
    window.localStorage.setItem('displayOptions', JSON.stringify(options))
  }
  const setCard = (changedCard: CardType) => {
    setAndSaveCards([
      ...cards.slice(0, activeCardIdx),
      changedCard,
      ...cards.slice(activeCardIdx + 1)
    ])
  }
  const createNewCard = () => {
    const lastType = cards[activeCardIdx].type
    setAndSaveCards([
      ...cards.slice(0, activeCardIdx + 1),
      {
        ...emptyCard,
        type: lastType
      },
      ...cards.slice(activeCardIdx + 1)
    ])
    setActiveCardIdx(activeCardIdx + 1)

  }
  const deleteCard = () => {
    if (cards.length === 1) {
      setAndSaveCards([sampleCard])
    } else {
      setAndSaveCards([
        ...cards.slice(0, activeCardIdx),
        ...cards.slice(activeCardIdx + 1)
      ])
    }
    const newIndex = activeCardIdx === 0 ? 0 : activeCardIdx - 1
    setActiveCardIdx(newIndex)
  }
  const exportCards = () => {
    const element = document.createElement('a')
    const csvContent = exportCSV(cards)
    const file = new Blob([csvContent], {type: 'text/csv'})
    element.href = URL.createObjectURL(file)
    element.download = 'my-story-engine-cards.csv'
    document.body.appendChild(element)
    element.click()
  }
  const importCards = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]
    file?.text().then(text => {
      try {
        console.log(importCSV(text))
        setAndSaveCards(importCSV(text))
      } catch (e) {
        alert(`Wrong file imported - ${e}`)
      }
    })
  }
  const clearCards = () => {
    setAndSaveCards([sampleCard])
    setActiveCardIdx(0)
  }
  const card = cards[activeCardIdx]
  return (
    <AppContainer>
      <MobilePlaceholder />
      <TabletDesktopWrapper>
        <LeftMenu
          card={card}
          setCard={setCard}
          createNewCard={createNewCard}
          deleteCard={deleteCard}
          exportCards={exportCards}
          importCards={importCards}
          clearCards={clearCards}
          displayOptions={displayOptions}
          setDisplayOptions={setAndSaveOptions}
        />
        <PagesManager
          cards={cards}
          setActiveCardIdx={setActiveCardIdx}
          displayOptions={displayOptions}
          activeCardIdx={activeCardIdx}
        />
      </TabletDesktopWrapper>
    </AppContainer>
  );
}

export default App