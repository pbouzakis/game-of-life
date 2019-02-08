import React, { Component } from 'react';
import logo from './game-of-life-logo.png';
import './App.css';
import Board from './Board';
import { toInput } from './input';

const bitmap = toInput();
console.log(bitmap);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <main>
          <Board bitmap={bitmap}/>
        </main>
      </div>
    );
  }
}

export default App;
