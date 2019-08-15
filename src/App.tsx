/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { MouseEvent } from 'react';
import { useImmer } from 'use-immer';

import {
  GameState,
  placeColor,
  randomColor,
  calculateGameState,
  createGrid,
  layouts,
  Color,
} from './game';

import GameGrid from './components/GameGrid';
import GameObjective from './components/GameObjective';
import GameControls from './components/GameControls';
import GameStatus from './components/GameStatus';

const container = css`
  display: grid;
  grid-template-columns: 15% 60% 23%;
`;

function App() {
 const [game, updateGame] = useImmer({
   turn: 25,
   grid: createGrid(layouts[0]),
   targetColor: randomColor(),
   layout: 0,
   status: GameState.Playing,
 });

 const onPlaceColor = (color: Color) => {
  updateGame(draft => {
    draft.turn -= 1;
    draft.grid = placeColor(draft.grid, color);
    draft.status = calculateGameState(
      draft.grid,
      draft.targetColor,
      draft.turn,
    );
  });
 };

 const onNextLevel = (event: MouseEvent) => {
  updateGame(draft => {
    draft.layout += 1;
    draft.turn = 25;
    draft.grid = createGrid(layouts[draft.layout % layouts.length]);
    draft.targetColor = randomColor();
    draft.status = GameState.Playing;
  });
 };

 const onRetryLevel = (event: MouseEvent) => {
  updateGame(draft => {
    draft.turn = 25;
    draft.grid = createGrid(layouts[draft.layout % layouts.length]);
    draft.targetColor = randomColor();
    draft.status = GameState.Playing;
  });
 };

 return (
  <div css={container}>
    <div>
      {game.status === GameState.Playing ? (
        <GameObjective
          target={game.targetColor}
          turn={game.turn}
        />
      ) : null}
    </div>
    <div>
      {game.status === GameState.Playing ? (
        <GameGrid
          grid={game.grid}
        />
      ) : null}
      {game.status === GameState.Won ? (
        <GameStatus
          title="You Won!"
          button="Next Level"
          onClick={onNextLevel}
        />
      ) : null}
      {game.status === GameState.Lost ? (
        <GameStatus
          title="You Lost!"
          button="Retry Level"
          onClick={onRetryLevel}
        />
      ) : null}
    </div>
    <div>
      {game.status === GameState.Playing ? (
        <GameControls
          onPlaceColor={onPlaceColor}
        />
      ) : null}
    </div>
  </div>
 );
}
export default App;
