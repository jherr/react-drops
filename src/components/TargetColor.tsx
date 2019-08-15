import React from 'react';

import GameIcon from './GameIcon';

import { Color } from '../game';

type TargetColorProps = {
  color: Color,
}

const TargetColor = ({ color }: TargetColorProps) => (
  <div
    className={`target target-${color as string}`}
  >
    <GameIcon
      color={color}
    />
  </div>
)

export default TargetColor;
