import React from 'react';
import logo from './game-of-life-logo.png';
import './App.css';
import Game from './Game';

const App: React.SFC = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <main>
      <Game />
    </main>
  </div>
);

export default App;
