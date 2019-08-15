import React from 'react';

import GameIcon from './GameIcon';

import { Color } from '../game';

type ButtonProps = {
  color: Color,
  onClick: () => void,
}

const Button = ({ color, onClick }: ButtonProps) => (
  <button
    className={`btn btn-${color as string}`}
    onClick={onClick}
  >
    <GameIcon
      color={color}
    />
  </button>
);

export default Button;
