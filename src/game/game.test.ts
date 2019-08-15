import Color from './colors';
import {
  createGrid,
  unlock,
  createCellGrid,
  getCell,
  getByColor,
} from './grid';
import {
  GameState,
  placeColor,
  calculateGameState,
} from './game'
import Cell from './cell';

const colorMap: any = {
  A: Color.Any,
  B: Color.Blue,
  G: Color.Green,
  b: Color.LightBlue,
  R: Color.Red,
  Y: Color.Yellow,
  P: Color.Pink,
};

export const createTestGrid = (template: string): {
  grid: Cell[],
  layout: number[][],
} => {
  // Parse out the template
  const layout: number[][] = [];
  const colors: Color[][] = [];
  template.split(/\n/).forEach((line, y) => {
    layout.push([]);
    colors.push([]);
    line.split('').forEach((char) => {
      if (char !== '-') {
        layout[y].push(1);
        colors[y].push(colorMap[char]);
      } else {
        layout[y].push(0);
        colors[y].push(Color.None);
      }
    });
  });

  // Create the grid, recolor and remove specials
  const grid = unlock(createGrid(layout));
  const cg = createCellGrid(grid);
  colors.forEach((row, y) => {
    row.forEach((color, x) => {
      const cell = getCell(cg, x, y);
      if (color !== Color.None) {
        cell!.color = color;
        cell!.randomize = false;
      }
    });
  });

  return {
    grid,
    layout,
  };
};

describe('Game', () => {
  it('should initiatize', () => {
    const { grid } = createTestGrid(
`ABB
BBB
BB-`);
    const ng = placeColor(grid, Color.Red);
    expect(getByColor(ng, Color.Red).length).toBe(1);
  });

  it('should handle locks', () => {
    const { grid } = createTestGrid(
`ABB
BBR
BB-`);

    const cg = createCellGrid(grid);
    getCell(cg, 1, 0)!.lock = true;
    getCell(cg, 1, 1)!.key = true;
    const ng = placeColor(grid, Color.Blue);
    expect(getByColor(ng, Color.Blue).length).toBe(7);
  });

  it('should handle randomize', () => {
    const { grid } = createTestGrid(
`ABB
BBR
BB-`);
    const cg = createCellGrid(grid);
    getCell(cg, 1, 0)!.randomize = true;
    const ng = placeColor(grid, Color.Blue);
    expect(getByColor(ng, Color.Blue).length).not.toBe(7);
  });

  it('should handle a win', () => {
    const { grid } = createTestGrid(
`ABB
BBB
BBB`);
    const ng = placeColor(grid, Color.Blue);
    expect(calculateGameState(ng, Color.Blue, 25)).toBe(GameState.Won);
  });

  it('should handle a loss through no more of the target color', () => {
    const { grid } = createTestGrid(
`ARR
RRR
RRR`);
    expect(calculateGameState(grid, Color.Blue, 25)).toBe(GameState.Lost);
  });

  it('should handle a loss through no more turns', () => {
    const { grid } = createTestGrid(
`ARB
RRB
BBB`);
    const ng = placeColor(grid, Color.Blue);
    expect(calculateGameState(ng, Color.Blue, 1)).toBe(GameState.Lost);
  });
});
