/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import Button from './Button';

import { Color } from '../game';

const container = css`
  display: grid;
  grid-template-columns: 50% 50%;
  column-gap: 1em;
  row-gap: 1em;
`;

export default ({ onPlaceColor }: {
  onPlaceColor: (color: Color) => void,
}) => (
  <div css={container}>
    <Button
      onClick={() => onPlaceColor(Color.Green)}
      color={Color.Green}
    />
    <Button
      onClick={() => onPlaceColor(Color.Blue)}
      color={Color.Blue}
    />
    <Button
      onClick={() => onPlaceColor(Color.LightBlue)}
      color={Color.LightBlue}
    />
    <Button
      onClick={() => onPlaceColor(Color.Pink)}
      color={Color.Pink}
    />
    <Button
      onClick={() => onPlaceColor(Color.Red)}
      color={Color.Red}
    />
    <Button
      onClick={() => onPlaceColor(Color.Yellow)}
      color={Color.Yellow}
    />
  </div>
);
