import React from 'react'
import './App.css'
import { Card } from './Card/Card'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Card 
          bottom='Much more text here to check how it would behave - bottom'
          top='top'
          left='left'
          right='right'
        />
      </header>
    </div>
  );
}

export default App;
