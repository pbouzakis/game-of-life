type Cell = {
  isAlive: boolean;
  neighbors: Cell[];
};

const nextTick = (cell: Cell) => ({
  isAlive: !hasLessThanTwoLiveNeighbors(cell) && !hasMoreThanThreeLiveNeighbors(cell),
  neighbors: cell.neighbors,
});

const hasLessThanTwoLiveNeighbors = (cell: Cell) => (
  sumLiveNeighbors(cell) < 2
);

const hasMoreThanThreeLiveNeighbors = (cell: Cell) => (
  sumLiveNeighbors(cell) > 3
);

const sumLiveNeighbors = (cell: Cell) => (
  cell.neighbors.reduce((prev, current) => (
    current.isAlive ? prev + 1 : prev
  ), 0)
);

const Doubles = {
  toLiveCell: (neighbors: Cell[] = []): Cell => ({ isAlive: true, neighbors }),
  toDeadCell: (neighbors: Cell[] = []): Cell => ({ isAlive: false, neighbors }),
};

// Any live cell with fewer than two live neighbors dies, as if by underpopulation
describe('Underpopulation', () => {
  it('dies with no live neighbors', () => {
    const cellWithNoLiveNeighbors = Doubles.toLiveCell([]);

    expect(nextTick(cellWithNoLiveNeighbors).isAlive).toBeFalsy();
  });

  it('dies with 1 live neighbors', () => {
    const cellWithOneLiveNeighbor = Doubles.toLiveCell([
      Doubles.toLiveCell(),
    ]);

    expect(nextTick(cellWithOneLiveNeighbor).isAlive).toBeFalsy();
  });
});

// Any live cell with two or three live neighbors lives on to the next generation.
describe('Lives on to the next generation', () => {
  it('lives with 2 live neighbors', () => {
    const cellWithOneLiveNeighbor = Doubles.toLiveCell([
      Doubles.toLiveCell(),
      Doubles.toLiveCell(),
    ]);

    expect(nextTick(cellWithOneLiveNeighbor).isAlive).toBeTruthy();
  });

  it('lives with 3 live neighbors', () => {
    const cellWithOneLiveNeighbor = Doubles.toLiveCell([
      Doubles.toLiveCell(),
      Doubles.toLiveCell(),
      Doubles.toLiveCell(),
    ]);

    expect(nextTick(cellWithOneLiveNeighbor).isAlive).toBeTruthy();
  });
});

// Any live cell with more than three live neighbors dies, as if by overpopulation.
describe('Overpopulation', () => {
  it('dies with 4 live neighbors', () => {
    const cellWithOneLiveNeighbor = Doubles.toLiveCell([
      Doubles.toLiveCell(),
      Doubles.toLiveCell(),
      Doubles.toLiveCell(),
      Doubles.toLiveCell(),
    ]);

    expect(nextTick(cellWithOneLiveNeighbor).isAlive).toBeFalsy();
  });

  it('dies with 5 live neighbors', () => {
    const cellWithOneLiveNeighbor = Doubles.toLiveCell([
      Doubles.toLiveCell(),
      Doubles.toLiveCell(),
      Doubles.toLiveCell(),
      Doubles.toLiveCell(),
      Doubles.toLiveCell(),
    ]);

    expect(nextTick(cellWithOneLiveNeighbor).isAlive).toBeFalsy();
  });
});