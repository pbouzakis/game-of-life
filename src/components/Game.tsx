import React, { useState, useEffect, useLayoutEffect } from 'react';
import Board from './Board';
import { Generation } from '../GameOfLife';
import GameFactory from '../factory';

const TICK_DELAY = 1000;

const Game: React.SFC = () => {
  const game = GameFactory.create();
  const [generation, setBitMap] = useState(game.seed());
  let timeoutId: any;

  const update = () => {
    timeoutId = setTimeout(() => {
      setBitMap(game.tick(generation));
    }, TICK_DELAY);
  };

  useEffect(update);

  const handleRestart = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setBitMap(game.seed())
  };

  return (
    <div>
      <Board bitmap={toBitMapFrom(generation)} />
      <section>
        <button onClick={handleRestart}>Restart</button>
      </section>
    </div>
  );
};

const toBitMapFrom = (generation: Generation) => (
  generation.map(rows => rows.map(cell => cell.isAlive))
);

export default Game;