import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './game-of-life-logo.png';
import './App.css';
import Game from './Game';
import Start from './Start';

const App: React.SFC = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
      </header>
      <main>
        <Route exact path="/" component={Start} />
        <Route exact path="/game" component={Game} />
      </main>
      <footer>
      </footer>
    </div>
  </Router>
);

export default App;
