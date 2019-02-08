type Cell = {
  isAlive: boolean;
  neighbors: Cell[];
};

const nextTick = (cell: Cell) => ({
  isAlive: !hasLessThanTwoLiveNeighbors(cell),
  neighbors: cell.neighbors,
});

const hasLessThanTwoLiveNeighbors = (cell: Cell) => (
  sumLiveNeighbors(cell) < 2
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
describe('Dies due to underpopulation', () => {
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

  it('lives with 2 live neighbors', () => {
    const cellWithOneLiveNeighbor = Doubles.toLiveCell([
      Doubles.toLiveCell(),
      Doubles.toLiveCell(),
    ]);

    expect(nextTick(cellWithOneLiveNeighbor).isAlive).toBeTruthy();
  });
});
