import React, { MouseEvent } from 'react';

type GameStatusProps = {
  title: String,
  button: string,
  onClick: (evt: MouseEvent) => void,
}

export default ({ title, button, onClick }: GameStatusProps) => (
  <div className="game-status">
    <div>{title}</div>
    <button onClick={onClick} className="btn-status">
      {button}
    </button>
  </div>
);
