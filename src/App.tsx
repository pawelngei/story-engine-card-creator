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

const sampleCard = {
  top: 'topText',
  bottom: 'bottomText',
  type: 'engine'
}

const App = () => {
  const [cards, setCards] = useState<CardType[]>([sampleCard])
  const [activeCardIdx, setActiveCardIdx] = useState(0)
  const card = cards[activeCardIdx]
  const setCard = (card: CardType) => {
    setCards([card]) //TODO
  }
  return (
    <AppContainer>
      <LeftMenu
        card={card}
        setCard={setCard}
      />
      <PaperCardScrollContainer>
        <PaperCardScrollInner>
          <PaperCard cards={cards} />
        </PaperCardScrollInner>
      </PaperCardScrollContainer>
    </AppContainer>
  );
}

export default App;
