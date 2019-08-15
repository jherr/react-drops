import { cloneDeep } from 'lodash';

import {
  getByOtherColor,
  getByColorUnOwned,
  colorize,
  unlock,
  randomize,
} from './grid';
import Cell from './cell';
import Color, { Colors } from './colors';
import {
  hasKey,
  hasRandomize,
} from './cell-list';

export enum GameState {
  Playing,
  Won,
  Lost,
}

export const createTargetColor = () => Colors[Math.floor(Math.random() * Colors.length)];

const hasWon = (cells: Cell[], targetColor: Color): boolean =>
  getByOtherColor(cells, targetColor).length === 0;

const hasLost = (cells: Cell[], targetColor: Color): boolean => (
  getByOtherColor(cells, targetColor).length > 0 &&
  getByColorUnOwned(cells, targetColor).length === 0
);

export const placeColor = (cells: Cell[], color: Color): Cell[] => {
  let changedCells: Cell[] = [];
  let iterations = 0;

  let currentCells: Cell[] = cloneDeep(cells);
  do {
    const {
      newCells,
      changed,
    } = colorize(currentCells, color);
    currentCells = newCells;
    changedCells = changed;
    if (hasKey(changed)) {
      currentCells = unlock(newCells);
    }
    if (hasRandomize(changed)) {
      currentCells = randomize(newCells);
    }
    iterations += 1;
  } while (changedCells.length > 0 && iterations < 100);

  return currentCells;
}

export const calculateGameState = (cells: Cell[], targetColor: Color, turns: number): GameState => {
  let state: GameState = GameState.Playing;
  if (hasLost(cells, targetColor)) {
    state = GameState.Lost;
  } else if (hasWon(cells, targetColor)) {
    state = GameState.Won;
  } else if (turns - 1 <= 0) {
    state = GameState.Lost;
  }
  return state;
}
