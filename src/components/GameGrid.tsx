/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import { Cell } from '../game';

import CellElement from './Cell';

const container = css`
  display: grid;
  grid-template-columns: repeat(10 8vw);
  grid-auto-rows: 7vw;
`;

export default ({ grid }: {
  grid: Cell[],
}) => (
  <div css={container}>
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
