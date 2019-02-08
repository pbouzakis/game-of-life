import range from './range';
import {
  CellEnvironment,
  CellLocation,
  Generation,
  Neighbor,
} from './GameOfLife';

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

  toDeadGeneration: (size: number): Generation => (
    range(size).map(() => range(size).map(() => ({
      isAlive: false,
    })))
  ),

  generationBuilder: (size: number, gen: Generation = Doubles.toDeadGeneration(size)) => ({
    addLiveCell: (x: number, y: number) => (
      Doubles.generationBuilder(size, gen.map((row, i) => (
        row.map(({ isAlive }, j) => i === x && j === y ? { isAlive: true } : { isAlive })
      )))
    ),
    build: () => gen,
  }),
};

export default Doubles;