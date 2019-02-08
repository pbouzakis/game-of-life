import range from './range';

const size = 50;

const toInput = () => (
  range(size)
    .map(i => range(size).map(j => toRandomBits()))
);

const DENSITY = .4;

const toRandomBits = () => (
  Boolean(Math.round(Math.random() - DENSITY))
);

export {
  toInput,
}