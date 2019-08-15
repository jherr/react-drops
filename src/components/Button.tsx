/** @jsx jsx */
import { jsx, css, SerializedStyles } from '@emotion/core';
import ColorHelper from 'color';

import GameIcon from './GameIcon';
import colors from '../colors';

import { Color } from '../game';

const btn = css`
  width: 100%;
  height: 6vw;
  border-radius: 5px;
`;

const styleMap: { [c in Color]: SerializedStyles } = {
  [Color.None]: css``,
  [Color.Any]: css``,
  [Color.Red]: css`
    background: ${ColorHelper(colors.red).lighten(0.1).string()};
  `,
  [Color.Blue]: css`
    background: ${ColorHelper(colors.blue).lighten(0.1).string()};
  `,
  [Color.LightBlue]: css`
    background: ${ColorHelper(colors.lightBlue).lighten(0.1).string()};
  `,
  [Color.Green]: css`
    background: ${ColorHelper(colors.green).lighten(0.1).string()};
  `,
  [Color.Pink]: css`
    background: ${ColorHelper(colors.pink).lighten(0.1).string()};
  `,
  [Color.Yellow]: css`
    background: ${ColorHelper(colors.yellow).lighten(0.1).string()};
  `,
};

type ButtonProps = {
  color: Color,
  onClick: () => void,
}

const Button = ({ color, onClick }: ButtonProps) => (
  <button
    css={[btn, styleMap[color]]}
    onClick={onClick}
  >
    <GameIcon
      color={color}
    />
  </button>
);

export default Button;
