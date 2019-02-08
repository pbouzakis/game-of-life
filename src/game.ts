export type Generation = Cell[][];

export type Cell = { isAlive: boolean };

export type CellEnvironment =
  & Cell
  & { liveNeighbors: Neighbor[] };

export type Neighbor =
  & Cell
  & { location: CellLocation };

export type CellLocation = [number, number]; // [x, y]

const transition = (cell: CellEnvironment): Cell => ({
  isAlive: willLiveOnToNextGeneration(cell),
});

const willLiveOnToNextGeneration = (cell: CellEnvironment) => (
  cell.isAlive
    ? !(hasLessThanTwoLiveNeighbors(cell) || hasMoreThanThreeLiveNeighbors(cell))
    : hasExactlyThreeLiveNeighbors(cell)
);

const hasLessThanTwoLiveNeighbors = (cell: CellEnvironment) => (
  sumLiveNeighbors(cell) < 2
);

const hasMoreThanThreeLiveNeighbors = (cell: CellEnvironment) => (
  sumLiveNeighbors(cell) > 3
);

const hasExactlyThreeLiveNeighbors = (cell: CellEnvironment) => (
  sumLiveNeighbors(cell) === 3
);

const sumLiveNeighbors = (cell: CellEnvironment) => (
  cell.liveNeighbors.reduce((prev, current) => (
    current.isAlive ? prev + 1 : prev
  ), 0)
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
  isAlive: Boolean(gen[x] && gen[x][y]),
});

export {
  getLiveNeighborsFrom,
  transition,
};