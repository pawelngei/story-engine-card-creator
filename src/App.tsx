import React, { useState } from 'react'
import { CardType } from './Card/Card'
import { PagesManager } from './PagesManager/PagesManager'
import { LeftMenu } from './LeftMenu/LeftMenu'
import { MobilePlaceholder } from './MobilePlaceholder/MobilePlaceholder'
import styled from 'styled-components'
import { exportCSV, importCSV } from './utils/csv'
import './App.css'

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

const emptyCard = {
  top: '',
  bottom: '',
  left: '',
  right: '',
  type: 'agent'
}

const sampleCard = {
  top: 'topText',
  bottom: 'bottomText',
  left: '',
  right: '',
  type: 'engine'
}

const App = () => {
  const savedCards = JSON.parse(window.localStorage.getItem('cards') || 'null')
  const [cards, setCards] = useState<CardType[]>(
    savedCards || [sampleCard]
  )
  const [activeCardIdx, setActiveCardIdx] = useState(0)
  const [displayBacks, setDisplayBacks] = useState(false)
  const [backQuality, setBackQuality] = useState('black')
  const setAndSaveCards = (cards: CardType[]) => {
    setCards(cards)
    window.localStorage.setItem('cards', JSON.stringify(cards))
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
          displayBacks={displayBacks}
          setDisplayBacks={setDisplayBacks}
          backQuality={backQuality}
          setBackQuality={setBackQuality}
        />
        <PagesManager
          cards={cards}
          setActiveCardIdx={setActiveCardIdx}
          displayBacks={displayBacks}
          backQuality={backQuality}
        />
      </TabletDesktopWrapper>
    </AppContainer>
  );
}

export default App;
