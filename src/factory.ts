import { toInput } from './input';
import GameOfLife from './GameOfLife';

const randomGame = {
  seed: toInput,
  tick: toInput,
};

const create = (size: number) => GameOfLife.create(size);

export default {
  create,
};
