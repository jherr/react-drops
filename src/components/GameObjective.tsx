/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import TargetColor from './TargetColor';

import { Color } from '../game';

const styleStatus = css`
  text-align: center;
`;
const styleHeader = css`
  font-size: large;
  margin-top: 1em;
  margin-bottom: 1em;
`;
const styleTurnsLeft = css`
  font-size: xx-large;
`;

export default ({ turn, target }: {
  turn: number,
  target: Color,
} ) => (
  <div css={styleStatus}>
    <div css={styleHeader}>
      Target Color
    </div>
    <TargetColor
      color={target}
    />
    <div css={styleHeader}>
      Turns Left
    </div>
    <div css={styleTurnsLeft}>
      { turn }
    </div>
  </div>
);
