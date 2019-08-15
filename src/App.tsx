import React, { MouseEvent } from 'react';
import { useImmer } from 'use-immer';

import {
  createGrid,
} from './game/grid';
import {
  GameState,
  placeColor,
  createTargetColor,
  calculateGameState,
} from './game/game';
import layouts from './game/layouts';
import Color from './game/colors';

import GameGrid from './components/GameGrid';
import GameObjective from './components/GameObjective';
import GameControls from './components/GameControls';
import GameStatus from './components/GameStatus';

function App() {
 const [game, updateGame] = useImmer({
   turn: 25,
   grid: createGrid(layouts[0]),
   targetColor: createTargetColor(),
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
    draft.targetColor = createTargetColor();
    draft.status = GameState.Playing;
  });
 };

 const onRetryLevel = (event: MouseEvent) => {
  updateGame(draft => {
    draft.turn = 25;
    draft.grid = createGrid(layouts[draft.layout % layouts.length]);
    draft.targetColor = createTargetColor();
    draft.status = GameState.Playing;
  });
 };

 return (
  <div className="container">
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
