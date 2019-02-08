import React, { useState, useEffect, useLayoutEffect } from 'react';
import Board from './Board';
import {toInput} from './input';

const TICK_DELAY = 1000;

const Game: React.SFC = () => {
  const [bitmap, setBitMap] = useState(toInput());

  const update = () => {
    setTimeout(() => setBitMap(toInput()), TICK_DELAY);
  };

  useEffect(update);

  return <Board bitmap={bitmap} />;
};

export default Game;