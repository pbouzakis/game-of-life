import { toInput } from './input';

const randomGame = {
  seed: toInput,
  tick: toInput,
};

const create = () => randomGame;

export default {
  create,
};
