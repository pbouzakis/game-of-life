const size = 50;

const range = (size: number) => (
  Array.from(Array(size).keys())
);

const toInput = () => (
  range(size)
    .map(i => range(size).map(j => toRandom()))
);

const DENSITY = .4;

const toRandom = () => (
  Math.round(Math.random() - DENSITY)
);

export {
  toInput,
}