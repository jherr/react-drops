import { cloneDeep } from 'lodash';

export const layouts = [
  [
    [ 0, 0, 0, 1, 1, 1, 1, 0, 0, 0 ],
    [ 0, 0, 1, 1, 1, 1, 1, 1, 0, 0 ],
    [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
    [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 0, 0, 1, 1, 1, 1, 1, 1, 0, 0 ],
    [ 0, 0, 0, 1, 1, 1, 1, 0, 0, 0 ],
  ],
  [
    [ 0, 0, 0, 1, 1, 1, 1, 0, 0, 0 ],
    [ 0, 0, 1, 1, 1, 1, 1, 1, 0, 0 ],
    [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
    [ 1, 1, 1, 1, 0, 0, 1, 1, 1, 1 ],
    [ 1, 1, 1, 1, 0, 0, 1, 1, 1, 1 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
    [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 0, 0, 1, 1, 1, 1, 1, 1, 0, 0 ],
    [ 0, 0, 0, 1, 1, 1, 1, 0, 0, 0 ],
  ],
];

export enum GameState {
  Playing,
  Won,
  Lost,
}

export enum Color {
  Red = 'red',
  Blue = 'blue',
  LightBlue = 'lightBlue',
  Green = 'green',
  Pink = 'pink',
  Yellow = 'yellow',
  Any = 'any',
  None = 'none',
}

export const Colors: Color[] = [
  Color.Red,
  Color.Blue,
  Color.LightBlue,
  Color.Green,
  Color.Pink,
  Color.Yellow,
];

export interface Cell {
  color: Color;
  owned: boolean;
  key: boolean;
  lock: boolean;
  randomize: boolean;
  x: number;
  y: number;
};

type SpecialCallbackFunc = (c: Cell) => {};
type CellGrid = (Cell | undefined)[][];

export const randomColor = () => Colors[Math.floor(Math.random() * Colors.length)];

export const randomizeColor = (cell: Cell): Cell => ({
  ...cell,
  color: randomColor(),
});

export const createCell = (x: number, y: number): Cell => ({
  color: Color.None,
  owned: false,
  key: false,
  lock: false,
  randomize: false,
  x,
  y,
});

export const isSpecial = (cell: Cell): boolean => cell.key || cell.lock || cell.randomize;

export const hasLock = (cells: Cell[]) =>
  cells.filter((c) => c.lock === true).length > 0;

export const hasKey = (cells: Cell[]) =>
  cells.filter((c) => c.key === true).length > 0;

export const hasRandomize = (cells: Cell[]) =>
  cells.filter((c) => c.randomize === true).length > 0;

const nonSpecialCells = (cells: Cell[]): Cell[] => cells.filter(
  (c: Cell) => !c.owned && c.color !== Color.Any && !isSpecial(c),
);

export const owned = (cells: Cell[]): Cell[] => cells.filter(
  (c: Cell) => c.owned,
);

export const getByColor = (cells: Cell[], color: Color): Cell[] => cells.filter(
  (c: Cell) => c.color === color,
);

export const getByColorUnOwned = (cells: Cell[], color: Color): Cell[] => cells.filter(
  (c: Cell) => c.color === color && !c.owned,
);

export const getByOtherColor = (cells: Cell[], color: Color): Cell[] => cells.filter(
  (c: Cell) => c.color !== color,
);

const placeSpecial = (cells: Cell[], callback: SpecialCallbackFunc): Cell[] => {
  const newCells = cloneDeep(cells);
  const nons = nonSpecialCells(newCells);
  callback(nons[Math.floor(Math.random() * nons.length)]);
  return newCells;
};

export const getCell = (cellGrid: CellGrid, x: number, y: number): Cell | undefined =>
  (y >= 0 && y < cellGrid[0].length && x >= 0 && x < cellGrid[0].length) ? cellGrid[x][y] : undefined;

const neighbors = (cellGrid: CellGrid, x: number, y: number): Cell[] => 
  [
    getCell(cellGrid, x, y - 1),
    getCell(cellGrid, x - 1, y),
    getCell(cellGrid, x + 1, y),
    getCell(cellGrid, x, y + 1),
  ].filter((c) => c != null) as Cell[];

export const createCellGrid = (cells: Cell[]): CellGrid => {
  const out: (Cell | undefined)[][] = [];
  const maxVal: number = cells.reduce(
    (val: number, cell: Cell) => Math.max(cell.x, val),
    0
  );
  for (let y = 0; y <= maxVal; y += 1) {
    out.push([]);
    for (let x = 0; x <= maxVal; x += 1) {
      out[y].push(undefined);
    }
  }
  cells.forEach(cell => out[cell.x][cell.y] = cell);
  return out;
};

export const colorize = (cells: Cell[], color: Color): {
  changed: Cell[],
  newCells: Cell[],
} => {
  const newCells = cloneDeep(cells);
  const grid: CellGrid = createCellGrid(newCells);
  const changed: Cell[] = [];
  owned(newCells)
    .forEach((cell) => {
      cell.color = color;
      neighbors(grid, cell.x, cell.y)
        .forEach((neighbor) => {
          if (neighbor.color === color && neighbor.lock === false && neighbor.owned === false) {
            neighbor.owned = true;
            changed.push(neighbor);
          }
        });
    });
  return {
    changed,
    newCells,
  };
}

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

export const randomize = (cells: Cell[]): Cell[] => cells
  .map((c: Cell) => {
    c.randomize = false;
    if (!c.owned) {
      c = randomizeColor(c);
    }
    return c;
  });

export const unlock = (cells: Cell[]): Cell[] => cells
  .map((c: Cell) => {
    c.lock = false;
    c.key = false;
    return c;
  });

export const createGrid = (layout: number[][]): Cell[] => {
  let cells: Cell[] = [];

  let first = true;
  for (let y = 0; y < layout[0].length; y += 1) {
    for (let x = 0; x < layout[0].length; x += 1) {
      if (layout[y][x] === 1) {
        let cell: Cell = createCell(x, y);
        if (first) {
          cell.color = Color.Any;
          cell.owned = true;
        } else {
          cell = randomizeColor(cell);
        }
        cells.push(cell);
        first = false;
      }
    }
  }

  if (cells.length > 0) {
    cells = placeSpecial(cells, (c) => c.lock = true);
    cells = placeSpecial(cells, (c) => c.key = true);
    cells = placeSpecial(cells, (c) => c.randomize = true);
  }
  return cells;
};

const hasWon = (cells: Cell[], targetColor: Color): boolean =>
  getByOtherColor(cells, targetColor).length === 0;

const hasLost = (cells: Cell[], targetColor: Color): boolean => (
  getByOtherColor(cells, targetColor).length > 0 &&
  getByColorUnOwned(cells, targetColor).length === 0
);

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
