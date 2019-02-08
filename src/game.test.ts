type Cell = {
  isAlive: boolean;
  neighbors: Cell[];
};

const tick = (cell: Cell) => ({
  isAlive: willLiveOnToNextGeneration(cell),
  neighbors: cell.neighbors,
});

const willLiveOnToNextGeneration = (cell: Cell) => (
  cell.isAlive
    ? !(hasLessThanTwoLiveNeighbors(cell) || hasMoreThanThreeLiveNeighbors(cell))
    : hasExactlyThreeLiveNeighbors(cell)
);

const hasLessThanTwoLiveNeighbors = (cell: Cell) => (
  sumLiveNeighbors(cell) < 2
);

const hasMoreThanThreeLiveNeighbors = (cell: Cell) => (
  sumLiveNeighbors(cell) > 3
);

const hasExactlyThreeLiveNeighbors = (cell: Cell) => (
  sumLiveNeighbors(cell) === 3
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
describe('Underpopulation: A live cell', () => {
  it('dies with no live neighbors', () => {
    const cellWithNoLiveNeighbors = Doubles.toLiveCell([]);

    expect(tick(cellWithNoLiveNeighbors).isAlive).toBeFalsy();
  });

  it('dies with 1 live neighbors', () => {
    const cellWithOneLiveNeighbor = Doubles.toLiveCell([
      Doubles.toLiveCell(),
    ]);

    expect(tick(cellWithOneLiveNeighbor).isAlive).toBeFalsy();
  });
});

// Any live cell with two or three live neighbors lives on to the next generation.
describe('Lives on to the next generation: A live cell', () => {
  it('lives with 2 live neighbors', () => {
    const cellWithOneLiveNeighbor = Doubles.toLiveCell([
      Doubles.toLiveCell(),
      Doubles.toLiveCell(),
    ]);

    expect(tick(cellWithOneLiveNeighbor).isAlive).toBeTruthy();
  });

  it('lives with 3 live neighbors', () => {
    const cellWithOneLiveNeighbor = Doubles.toLiveCell([
      Doubles.toLiveCell(),
      Doubles.toLiveCell(),
      Doubles.toLiveCell(),
    ]);

    expect(tick(cellWithOneLiveNeighbor).isAlive).toBeTruthy();
  });
});

// Any live cell with more than three live neighbors dies, as if by overpopulation.
describe('Overpopulation: A live cell', () => {
  it('dies with 4 live neighbors', () => {
    const cellWithOneLiveNeighbor = Doubles.toLiveCell([
      Doubles.toLiveCell(),
      Doubles.toLiveCell(),
      Doubles.toLiveCell(),
      Doubles.toLiveCell(),
    ]);

    expect(tick(cellWithOneLiveNeighbor).isAlive).toBeFalsy();
  });

  it('dies with 5 live neighbors', () => {
    const cellWithOneLiveNeighbor = Doubles.toLiveCell([
      Doubles.toLiveCell(),
      Doubles.toLiveCell(),
      Doubles.toLiveCell(),
      Doubles.toLiveCell(),
      Doubles.toLiveCell(),
    ]);

    expect(tick(cellWithOneLiveNeighbor).isAlive).toBeFalsy();
  });
});

// Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
describe('Reproduction: A dead cell', () => {
  it('lives with 3 live neighbors', () => {
    const cellWithOneLiveNeighbor = Doubles.toDeadCell([
      Doubles.toLiveCell(),
      Doubles.toLiveCell(),
      Doubles.toLiveCell(),
    ]);

    expect(tick(cellWithOneLiveNeighbor).isAlive).toBeTruthy();
  });

  // Otherwise it dies with any other neighbor configuration.
  describe('stays dead', () => {
    it('with 2 live neighbors', () => {
      const cellWithOneLiveNeighbor = Doubles.toDeadCell([
        Doubles.toLiveCell(),
        Doubles.toLiveCell(),
      ]);

      expect(tick(cellWithOneLiveNeighbor).isAlive).toBeFalsy();
    });

    it('with 4 live neighbors', () => {
      const cellWithOneLiveNeighbor = Doubles.toDeadCell([
        Doubles.toLiveCell(),
        Doubles.toLiveCell(),
        Doubles.toLiveCell(),
        Doubles.toLiveCell(),
      ]);

      expect(tick(cellWithOneLiveNeighbor).isAlive).toBeFalsy();
    });

    it('with no live neighbors', () => {
      const cellWithOneLiveNeighbor = Doubles.toDeadCell([]);

      expect(tick(cellWithOneLiveNeighbor).isAlive).toBeFalsy();
    });
  });
});