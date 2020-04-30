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
  const card = cards[activeCardIdx]
  return (
    <AppContainer>
      <LeftMenu
        card={card}
        setCard={setCard}
        createNewCard={createNewCard}
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
