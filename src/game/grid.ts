import { cloneDeep } from 'lodash';

import Cell, { randomizeColor, isSpecial, createCell } from './cell';
import Color from './colors';

type SpecialCallbackFunc = (c: Cell) => {};
type CellGrid = (Cell | undefined)[][];

const nonSpecialCells = (cells: Cell[]): Cell[] => cells.filter(
  (c: Cell) => !c.owned && c.color !== Color.Any && !isSpecial(c),
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

export const randomize = (cells: Cell[]): Cell[] => cells
  .map((c: Cell) => {
    c.randomize = false;
    if (!c.owned) {
      randomizeColor(c);
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
        const cell: Cell = createCell(x, y);
        if (first) {
          cell.color = Color.Any;
          cell.owned = true;
        } else {
          randomizeColor(cell);
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
