import React from 'react'
import './App.css'
import { Card } from './Card/Card'
import styled from 'styled-components'


const SizeWrapper = styled.div`
  width: 400px;
`

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SizeWrapper>
          <Card 
            bottom='Much more text here to check how it would behave - bottom'
            top='top'
            left='left'
            right='right'
          />
        </SizeWrapper>
      </header>
    </div>
  );
}

export default App;
