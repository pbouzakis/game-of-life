import { toInput } from './input';
import GameOfLife from './GameOfLife';

const randomGame = {
  seed: toInput,
  tick: toInput,
};

const create = () => GameOfLife.create(50);

export default {
  create,
};
