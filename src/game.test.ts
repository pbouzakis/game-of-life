import range from './range';
import {
  CellEnvironment,
  CellLocation,
  Generation,
  Neighbor,
  transition,
  getLiveNeighborsFrom,
} from './game';

const Doubles: any = {
  toLiveCell: (liveNeighbors: Neighbor[] = []): CellEnvironment => ({
    isAlive: true,
    liveNeighbors,
  }),

  toDeadCell: (liveNeighbors: Neighbor[] = []): CellEnvironment => ({
    isAlive: false,
    liveNeighbors,
  }),

  toLiveNeighbor: (location: CellLocation = [0, 0]) => ({
    isAlive: true,
    location,
  }),

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
// Any live cell with fewer than two live liveNeighbors dies, as if by underpopulation
  describe('A live cell with underpopulation: ', () => {
    it('dies with no live liveNeighbors', () => {
      const cellWithNoLiveNeighbors = Doubles.toLiveCell([]);

      expect(transition(cellWithNoLiveNeighbors).isAlive).toBeFalsy();
    });

    it('dies with 1 live liveNeighbors', () => {
      const cellWithOneLiveNeighbor = Doubles.toLiveCell([
        Doubles.toLiveNeighbor(),
      ]);

      expect(transition(cellWithOneLiveNeighbor).isAlive).toBeFalsy();
    });
  });

// Any live cell with two or three live liveNeighbors lives on to the next generation.
  describe('A live cell lives on to the next generation', () => {
    it('lives with 2 live liveNeighbors', () => {
      const cellWithOneLiveNeighbor = Doubles.toLiveCell([
        Doubles.toLiveNeighbor(),
        Doubles.toLiveNeighbor(),
      ]);

      expect(transition(cellWithOneLiveNeighbor).isAlive).toBeTruthy();
    });

    it('lives with 3 live liveNeighbors', () => {
      const cellWithOneLiveNeighbor = Doubles.toLiveCell([
        Doubles.toLiveNeighbor(),
        Doubles.toLiveNeighbor(),
        Doubles.toLiveNeighbor(),
      ]);

      expect(transition(cellWithOneLiveNeighbor).isAlive).toBeTruthy();
    });
  });

// Any live cell with more than three live liveNeighbors dies, as if by overpopulation.
  describe('A live cell with overpopulation', () => {
    it('dies with 4 live liveNeighbors', () => {
      const cellWithOneLiveNeighbor = Doubles.toLiveCell([
        Doubles.toLiveNeighbor(),
        Doubles.toLiveNeighbor(),
        Doubles.toLiveNeighbor(),
        Doubles.toLiveNeighbor(),
      ]);

      expect(transition(cellWithOneLiveNeighbor).isAlive).toBeFalsy();
    });

    it('dies with 5 live liveNeighbors', () => {
      const cellWithOneLiveNeighbor = Doubles.toLiveCell([
        Doubles.toLiveNeighbor(),
        Doubles.toLiveNeighbor(),
        Doubles.toLiveNeighbor(),
        Doubles.toLiveNeighbor(),
        Doubles.toLiveNeighbor(),
      ]);

      expect(transition(cellWithOneLiveNeighbor).isAlive).toBeFalsy();
    });
  });

// Any dead cell with exactly three live liveNeighbors becomes a live cell, as if by reproduction.
  describe('A dead cell for reproduction', () => {
    it('lives with exactly 3 live liveNeighbors', () => {
      const cellWithOneLiveNeighbor = Doubles.toDeadCell([
        Doubles.toLiveNeighbor(),
        Doubles.toLiveNeighbor(),
        Doubles.toLiveNeighbor(),
      ]);

      expect(transition(cellWithOneLiveNeighbor).isAlive).toBeTruthy();
    });

    // Otherwise it dies with any other neighbor configuration.
    describe('stays dead', () => {
      it('with 2 live liveNeighbors', () => {
        const cellWithOneLiveNeighbor = Doubles.toDeadCell([
          Doubles.toLiveNeighbor(),
          Doubles.toLiveNeighbor(),
        ]);

        expect(transition(cellWithOneLiveNeighbor).isAlive).toBeFalsy();
      });

      it('with 4 live liveNeighbors', () => {
        const cellWithOneLiveNeighbor = Doubles.toDeadCell([
          Doubles.toLiveNeighbor(),
          Doubles.toLiveNeighbor(),
          Doubles.toLiveNeighbor(),
          Doubles.toLiveNeighbor(),
        ]);

        expect(transition(cellWithOneLiveNeighbor).isAlive).toBeFalsy();
      });

      it('with no live liveNeighbors', () => {
        const cellWithOneLiveNeighbor = Doubles.toDeadCell([]);

        expect(transition(cellWithOneLiveNeighbor).isAlive).toBeFalsy();
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

    it('finds all live liveNeighbors from center', () => {
      const centerCell: CellLocation = [1, 1];
      const neighbors = getLiveNeighborsFrom(centerCell, gen);

      expect(neighbors.map(neighbor => neighbor.location)).toEqual([
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 2],
        [2, 1],
      ]);
    });

    it('finds all live liveNeighbors from top left', () => {
      const topLeft: CellLocation = [0, 0];
      const neighbors = getLiveNeighborsFrom(topLeft, gen);

      expect(neighbors.map(neighbor => neighbor.location)).toEqual([
        [0, 1],
        [1, 0],
      ]);
    });
  });
});