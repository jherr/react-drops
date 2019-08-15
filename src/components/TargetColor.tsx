/** @jsx jsx */
import { jsx, css, SerializedStyles } from '@emotion/core';
import ColorHelper from 'color';

import GameIcon from './GameIcon';
import colors from '../colors';

import { Color } from '../game';

const target = css`
  margin: 5px;
  width: 100%;
  padding-top: 4vw;
  padding-bottom: 4vw;
  border-radius: 5px;
  text-align: center;
`;

const styleMap: { [c in Color]: SerializedStyles } = {
  [Color.None]: css`
  `,
  [Color.Any]: css`
  `,
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

type TargetColorProps = {
  color: Color,
}

const TargetColor = ({ color }: TargetColorProps) => (
  <div
    css={[target, styleMap[color]]}
  >
    <GameIcon
      color={color}
    />
  </div>
)

export default TargetColor;
