import React from 'react';

import GameIcon from './GameIcon';

import Color from '../game/colors';

type CellElementProps = {
  x: number,
  y: number,
  color: Color,
  owned: boolean,
  lockFlag: boolean,
  keyFlag: boolean,
  randomizeFlag: boolean,
}

const CellElement = ({
  x,
  y,
  color,
  owned,
  lockFlag,
  keyFlag,
  randomizeFlag,
}: CellElementProps) => (
  <div
    style={{
      gridColumn: `${x + 1} / span 1`,
      gridRow: `${y + 1} / span 1`
    }}
    className={`cell cell-${color as string} ${owned ? 'owned' : ''}`}
  >
    <GameIcon
      color={color}
      lockFlag={lockFlag}
      keyFlag={keyFlag}
      randomizeFlag={randomizeFlag}
    />
  </div>
);

export default CellElement;
