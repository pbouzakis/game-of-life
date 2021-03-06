import range from './range';

export type Generation = Cell[][];

export type Cell = { isAlive: boolean };

export type CellEnvironment =
  & Cell
  & { liveNeighbors: Neighbor[] };

export type Neighbor =
  & Cell
  & { location: CellLocation };

export type CellLocation = [number, number]; // [x, y]

const toCellLocation = (x: number, y: number): CellLocation => [x, y];

const DEFAULT_DENSITY = .15;

const toGameOfLife = (size: number) => ({
  seed: (density: number = DEFAULT_DENSITY) => seed(size, density),
  tick: (gen: Generation) => (
    gen.map((row, x) => row.map((cell, y) => (
      transition({
        isAlive: cell.isAlive,
        liveNeighbors: getLiveNeighborsFrom(toCellLocation(x, y), gen),
      })
    )))
  ),
});

const seed = (size: number, density: number): Generation => (
  range(size)
    .map(() => range(size).map(() => ({ isAlive: randomBoolean(density) })))
);

const randomBoolean = (percent: number) => (
  Math.random() <= percent
);

const transition = (cell: CellEnvironment): Cell => ({
  isAlive: willLiveOnToNextGeneration(cell),
});

const willLiveOnToNextGeneration = (cell: CellEnvironment) => (
  cell.isAlive
    ? !(hasLessThanTwoLiveNeighbors(cell) || hasMoreThanThreeLiveNeighbors(cell))
    : hasExactlyThreeLiveNeighbors(cell)
);

const hasLessThanTwoLiveNeighbors = (cell: CellEnvironment) => (
  cell.liveNeighbors.length < 2
);

const hasMoreThanThreeLiveNeighbors = (cell: CellEnvironment) => (
  cell.liveNeighbors.length > 3
);

const hasExactlyThreeLiveNeighbors = (cell: CellEnvironment) => (
  cell.liveNeighbors.length === 3
);

const getLiveNeighborsFrom = ([x, y]: CellLocation, gen: Generation) => {
  const top = x - 1;
  const bottom = x + 1;
  const left = y - 1;
  const right = y + 1;

  const neighbors = [
    getNeighbor([top, left], gen),
    getNeighbor([top, y], gen),
    getNeighbor([top, right], gen),
    getNeighbor([x, left], gen),
    getNeighbor([x, right], gen),
    getNeighbor([bottom, left], gen),
    getNeighbor([bottom, y], gen),
    getNeighbor([bottom, right], gen),
  ];

  return neighbors.filter(neighbor => neighbor.isAlive);
};

const getNeighbor = ([x, y]: CellLocation, gen: Generation): Neighbor => ({
  location: [x, y],
  isAlive: Boolean(Array.isArray(gen[x]) && gen[x][y] && gen[x][y].isAlive),
});

export {
  getLiveNeighborsFrom,
  toCellLocation,
  transition,
};

export default {
  create: toGameOfLife,
};