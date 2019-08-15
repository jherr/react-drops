import React from 'react';

import { Cell } from '../game';

import CellElement from './Cell';

type GameGridProps = {
  grid: Cell[],
};

export default ({ grid }: GameGridProps) => (
  <div className="grid-container">
    {
      grid.map((cell: Cell) => (
        <CellElement
          x={cell.x}
          y={cell.y}
          owned={cell.owned}
          color={cell.color}
          keyFlag={cell.key}
          lockFlag={cell.lock}
          randomizeFlag={cell.randomize}
          key={(cell.x * 100) + cell.y}
        />
      ))
    }
  </div>
);
