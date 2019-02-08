import * as React from 'react';
import './Board.css';

const size = 50;

const Board: React.SFC<{ bitmap: BitMap }> = ({ bitmap }) => (
  <div className="Board">
    {bitmap.map((row, i) => (
      <Row key={i}>
        {row.map((bit, j) => (
          <Cell key={j} bit={bit} />
        ))}
      </Row>
    ))}
  </div>
);

const Row: React.SFC = ({ children }) => (
  <div className="Board-row">
    {children}
  </div>
);

const Cell: React.SFC<{ bit: Bit }> = ({ bit }) => (
  <div className={`Board-cell${bit ? ' Board-cell--filled' : ''}`} />
);

const range = (size: number) => (
  Array.from(Array(size).keys())
);

type Bit = boolean;
type BitMap = Bit[][];

export default Board;
