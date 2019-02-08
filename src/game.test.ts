import range from './range';

type Generation = boolean[][];

type Cell = {
  isAlive: boolean;
  neighbors: Cell[];
};

type Neighbor = {
  location: Location,
  isAlive: boolean,
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

type Location = [number, number];

const getLiveNeighborsFrom = ([x, y]: Location, gen: Generation) => {
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

const getNeighbor = ([x, y]: Location, gen: Generation): Neighbor => ({
  location: [x, y],
  isAlive: Boolean(gen[x] && gen[x][y]),
});

const Doubles: any = {
  toLiveCell: (neighbors: Cell[] = []): Cell => ({ isAlive: true, neighbors }),

  toDeadCell: (neighbors: Cell[] = []): Cell => ({ isAlive: false, neighbors }),

  toDeadGeneration: (size: number) => range(size).map(() => range(size).map(() => false)),

  generationBuilder: (size: number, gen: Generation = Doubles.toDeadGeneration(size)) => ({
    addLiveCell: (x: number, y: number) => (
      Doubles.generationBuilder(size, gen.map((row, i) => (
        row.map((isAlive, j) => i === x && j === y ? true : isAlive)
      )))
    ),
    build: () => gen,
  }),
};

describe('On each next tick', () => {
// Any live cell with fewer than two live neighbors dies, as if by underpopulation
  describe('A live cell with underpopulation: ', () => {
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
  describe('A live cell lives on to the next generation', () => {
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
  describe('A live cell with overpopulation', () => {
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
  describe('A dead cell for reproduction', () => {
    it('lives with exactly 3 live neighbors', () => {
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
});

describe('Within generation', () => {
  describe('given a generation of size 3 with top, left, right, bottom from the center are alive', () => {
    let gen: Generation;

    beforeEach(() => {
      gen = Doubles.generationBuilder(3)
        .addLiveCell(0, 0) // TOP LEFT
        .addLiveCell(0, 1) // TOP
        .addLiveCell(1, 0) // LEFT
        .addLiveCell(1, 2) // RIGHT
        .addLiveCell(2, 1) // BOTTOM
        .build();
    });

    it('finds all live neighbors from center', () => {
      const centerCell: Location = [1, 1];
      const neighbors = getLiveNeighborsFrom(centerCell, gen);

      expect(neighbors.map(neighbor => neighbor.location)).toEqual([
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 2],
        [2, 1],
      ]);
    });

    it('finds all live neighbors from top left', () => {
      const topLeft: Location = [0, 0];
      const neighbors = getLiveNeighborsFrom(topLeft, gen);

      expect(neighbors.map(neighbor => neighbor.location)).toEqual([
        [0, 1],
        [1, 0],
      ]);
    });
  });
});