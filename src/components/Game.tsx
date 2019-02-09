import React, { useState, useEffect, useLayoutEffect } from 'react';
import Board from './Board';
import { Generation } from '../GameOfLife';
import GameFactory from '../factory';
import GenerationStore from './GenerationStore';
import './Game.css';

const TICK_DELAY = 1000;
const GENERATION_SIZE = 150;

const Game: React.SFC = () => {
  const game = GameFactory.create(GENERATION_SIZE);
  const seed = GenerationStore.enabled ? GenerationStore.savedGen : game.seed();

  const [generation, setBitMap] = useState(seed);
  let timeoutId: any;

  const update = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      setBitMap(game.tick(generation));
    }, TICK_DELAY);
  };

  const handleRestart = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setBitMap(game.seed())
  };

  const handleConsoleGenerations = () => {
    console.log(JSON.stringify(generation));
  };

  useEffect(update);

  return (
    <div className="Game">
      <Board bitmap={toBitMapFrom(generation)} />
      <section className="Game-toolbar">
        <button onClick={handleRestart}>Restart</button>
        <button onClick={handleConsoleGenerations}>Console Generation</button>
      </section>
    </div>
  );
};

const toBitMapFrom = (generation: Generation) => (
  generation.map(rows => rows.map(cell => cell.isAlive))
);

export default Game;