import React from 'react';

import TargetColor from './TargetColor';

import Color from '../game/colors';

type GameObjectiveProps = {
  turn: number,
  target: Color,
}

export default ({ turn, target }: GameObjectiveProps ) => (
  <div className="status">
    <div className="header">
      Target Color
    </div>
    <TargetColor
      color={target}
    />
    <div className="header">
      Turns Left
    </div>
    <div className="turns-left">
      { turn }
    </div>
  </div>
);
