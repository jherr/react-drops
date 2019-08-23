/** @jsx jsx */
import { jsx, css, SerializedStyles } from '@emotion/core';
import ColorHelper from 'color';

import GameIcon from './GameIcon';
import colors from '../colors';

import { Color } from '../game';

const cell = css`
  margin: 1px;
  text-align: center;
  vertical-align: middle;
  padding-top: 25%;
  border-radius: 5vw;
`;

const styleMap: { [c in Color]: SerializedStyles } = {
  [Color.None]: css`
    background-image: radial-gradient(grey 60%, ${ColorHelper('grey').lighten(0.6).string()});
  `,
  [Color.Any]: css`
    background-image: radial-gradient(darkgreen, lightgreen);
  `,
  [Color.Red]: css`
    background-image: radial-gradient(${colors.red} 60%, ${ColorHelper(colors.red).lighten(0.6).string()});
  `,
  [Color.Blue]: css`
    background-image: radial-gradient(${colors.blue} 60%, ${ColorHelper(colors.blue).lighten(0.6).string()});
  `,
  [Color.LightBlue]: css`
    background-image: radial-gradient(${colors.lightBlue} 60%, ${ColorHelper(colors.lightBlue).lighten(0.6).string()});
  `,
  [Color.Green]: css`
    background-image: radial-gradient(${colors.green} 60%, ${ColorHelper(colors.green).lighten(0.6).string()});
  `,
  [Color.Pink]: css`
    background-image: radial-gradient(${colors.pink} 60%, ${ColorHelper(colors.pink).lighten(0.6).string()});
  `,
  [Color.Yellow]: css`
    background-image: radial-gradient(${colors.yellow} 60%, ${ColorHelper(colors.yellow).lighten(0.6).string()});
  `,
};

const ownedStyle = css`
  border-radius: 5px;
`;

const CellElement = ({
  x,
  y,
  color,
  owned,
  lockFlag,
  keyFlag,
  randomizeFlag,
}: {
  x: number,
  y: number,
  color: Color,
  owned: boolean,
  lockFlag: boolean,
  keyFlag: boolean,
  randomizeFlag: boolean,
}) => (
  <div
    style={{
      gridColumn: `${x + 1} / span 1`,
      gridRow: `${y + 1} / span 1`
    }}
    css={[cell, styleMap[color], owned ? ownedStyle : null]}
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
