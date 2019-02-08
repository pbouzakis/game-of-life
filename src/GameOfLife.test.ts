import Doubles from './Doubles';
import GameOfLife, {
  Generation,
  toCellLocation,
  transition,
  getLiveNeighborsFrom,
} from './GameOfLife';

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
      const centerCell = toCellLocation(1, 1);
      const neighbors = getLiveNeighborsFrom(centerCell, gen);

      expect(neighbors.map(neighbor => neighbor.location)).toEqual([
        toCellLocation(0, 0),
        toCellLocation(0, 1),
        toCellLocation(1, 0),
        toCellLocation(1, 2),
        toCellLocation(2, 1),
      ]);
    });

    it('finds all live liveNeighbors from top left', () => {
      const topLeft = toCellLocation(0, 0);
      const neighbors = getLiveNeighborsFrom(topLeft, gen);

      expect(neighbors.map(neighbor => neighbor.location)).toEqual([
        toCellLocation(0, 1),
        toCellLocation(1, 0),
      ]);
    });
  });
});

describe('Game of Life', () => {
  describe('When creating the seed generation', () => {
    let seed: Generation;
    const SIZE = 3;

    beforeEach(() => {
      const game = GameOfLife.create(SIZE);
      seed = game.seed();
    });

    it('with the correct size', () => {
      expect(seed.length).toBe(SIZE);
      expect(seed[0].length).toBe(SIZE);
      expect(seed[1].length).toBe(SIZE);
      expect(seed[2].length).toBe(SIZE);
    });

    it('with the correct shape', () => {
      expect(seed[0][0]).toHaveProperty('isAlive');
      expect(seed[0][1]).toHaveProperty('isAlive');
      expect(seed[0][2]).toHaveProperty('isAlive');

      expect(seed[1][0]).toHaveProperty('isAlive');
      expect(seed[1][1]).toHaveProperty('isAlive');
      expect(seed[1][2]).toHaveProperty('isAlive');

      expect(seed[2][0]).toHaveProperty('isAlive');
      expect(seed[2][1]).toHaveProperty('isAlive');
      expect(seed[2][2]).toHaveProperty('isAlive');
    });
  });
});