import React from 'react';

import Button from './Button';

import { Color } from '../game';

type GameControlsProps = {
  onPlaceColor: (color: Color) => void,
}

export default ({ onPlaceColor }: GameControlsProps) => (
  <div className="controls-container">
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
)