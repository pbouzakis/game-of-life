import React, { useState, useEffect, useLayoutEffect } from 'react';
import Board from './Board';
import GameFactory from '../factory';

const TICK_DELAY = 1000;

const Game: React.SFC = () => {
  const game = GameFactory.create();
  const [bitmap, setBitMap] = useState(game.seed());

  const update = () => {
    setTimeout(() => setBitMap(game.tick()), TICK_DELAY);
  };

  useEffect(update);

  return <Board bitmap={bitmap} />;
};

export default Game;