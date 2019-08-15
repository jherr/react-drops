import React from 'react';
import {
  faYinYang,
  faBell,
  faCrow,
  faChessKnight,
  faCloud,
  faGhost,
  faLock,
  faKey,
  faRecycle,
  faGem,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Color } from '../game';

const iconMap = {
  [Color.Any as string]: faGem,
  [Color.Blue as string]: faYinYang,
  [Color.Yellow as string]: faBell,
  [Color.Green as string]: faCrow,
  [Color.Pink as string]: faChessKnight,
  [Color.Red as string]: faCloud,
  [Color.LightBlue as string]: faGhost,
};

type GameIconProps = {
  color: Color,
  lockFlag?: boolean,
  keyFlag?: boolean,
  randomizeFlag?: boolean,
}

const GameIcon = ({ color, lockFlag, keyFlag, randomizeFlag }: GameIconProps) => {
  if (lockFlag) {
    return <FontAwesomeIcon icon={faLock} size="2x" />;
  }
  if (keyFlag) {
    return <FontAwesomeIcon icon={faKey} size="2x" />;
  }
  if (randomizeFlag) {
    return <FontAwesomeIcon icon={faRecycle} size="2x" />;
  }
  return <FontAwesomeIcon icon={iconMap[color]} color="white" size="2x" />;
};

export default GameIcon;