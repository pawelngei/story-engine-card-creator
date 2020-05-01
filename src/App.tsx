import React, { useState } from 'react'
import './App.css'
import { CardType } from './Card/Card'
import { PaperCard } from './PaperCard/PaperCard'
import { LeftMenu } from './LeftMenu/LeftMenu'
import styled from 'styled-components'

const AppContainer = styled.div`
  display: flex;
`

const PaperCardScrollContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: auto;
  @media print {
    overflow: visible;
  }
`

const PaperCardScrollInner = styled.div`
  padding: 5%;
  @media print {
    padding: 0;
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
  const [cards, setCards] = useState<CardType[]>([sampleCard])
  const [activeCardIdx, setActiveCardIdx] = useState(0)
  const setCard = (changedCard: CardType) => {
    setCards([
      ...cards.slice(0, activeCardIdx),
      changedCard,
      ...cards.slice(activeCardIdx + 1)
    ])
  }
  const createNewCard = () => {
    setActiveCardIdx(cards.length)
    setCards([...cards, emptyCard])
  }
  const deleteCard = () => {
    setCards([
      ...cards.slice(0, activeCardIdx),
      ...cards.slice(activeCardIdx + 1)
    ])
    const newIndex = activeCardIdx === 0 ? 0 : activeCardIdx - 1
    setActiveCardIdx(newIndex)
  }
  const exportCards = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(cards)], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = 'my-story-engine-cards.json'
    document.body.appendChild(element)
    element.click()
  }
  const importCards = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]
    file?.text().then(text => {
      console.log(text)
      try {
        setCards(JSON.parse(text))
      } catch (e) {
        alert(`Wrong file imported - ${e}`)
      }
    })
  }
  const card = cards[activeCardIdx]
  return (
    <AppContainer>
      <LeftMenu
        card={card}
        setCard={setCard}
        createNewCard={createNewCard}
        deleteCard={deleteCard}
        exportCards={exportCards}
        importCards={importCards}
      />
      <PaperCardScrollContainer>
        <PaperCardScrollInner>
          <PaperCard cards={cards} setActiveCard={setActiveCardIdx} />
        </PaperCardScrollInner>
        <PaperCardScrollInner>
          <PaperCard cards={cards} setActiveCard={setActiveCardIdx} backs />
        </PaperCardScrollInner>
      </PaperCardScrollContainer>
    </AppContainer>
  );
}

export default App;
