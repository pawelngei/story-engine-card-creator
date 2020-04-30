import React from 'react'
import './App.css'
import { Card } from './Card/Card'
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
`


function App() {
  return (
    <AppContainer>
      <LeftMenu />
      <PaperCardScrollContainer>
        <PaperCardScrollInner>
          <PaperCard />
        </PaperCardScrollInner>
      </PaperCardScrollContainer>
    </AppContainer>
  );
}

export default App;
