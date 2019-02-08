import React, { useState, useEffect, useLayoutEffect } from 'react';
import Board from './Board';
import { Generation } from '../GameOfLife';
import GameFactory from '../factory';

const TICK_DELAY = 1000;

const Game: React.SFC = () => {
  const game = GameFactory.create();
  const [generation, setBitMap] = useState(game.seed());

  const update = () => {
    setTimeout(() => {
      setBitMap(game.tick(generation));
    }, TICK_DELAY);
  };

  useEffect(update);

  return <Board bitmap={toBitMapFrom(generation)} />;
};

const toBitMapFrom = (generation: Generation) => (
  generation.map(rows => rows.map(cell => cell.isAlive))
);

export default Game;