const size = 50;

const range = (size: number) => (
  Array.from(Array(size).keys())
);

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