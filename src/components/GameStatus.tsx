/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { MouseEvent } from 'react';

const styleGameStatus = css`
  text-align: center;
  margin-top: 10em;
  font-size: xx-large;
`;
const styleButton = css`
  margin-top: 2em;
  font-size: xx-large;
  border-radius: 0.5em;
  border: 2px solid black;
  padding: 1em;
  font-family: Righteous, Arial, Helvetica, sans-serif;
`;

export default ({ title, button, onClick }: {
  title: String,
  button: string,
  onClick: (evt: MouseEvent) => void,
}) => (
  <div css={styleGameStatus}>
    <div>{title}</div>
    <button onClick={onClick} css={styleButton}>
      {button}
    </button>
  </div>
);
