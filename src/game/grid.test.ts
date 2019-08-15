import Color from './colors';
import {
  createGrid,
  unlock,
  createCellGrid,
  getCell,
  owned,
  getByColor,
  getByOtherColor,
  colorize,
  randomize,
} from './grid';
import Cell from './cell';

const colorMap: any = {
  B: Color.Blue,
  G: Color.Green,
  b: Color.LightBlue,
  R: Color.Red,
  Y: Color.Yellow,
  P: Color.Pink,
};

export const createTestGrid = (template: string): Cell[] => {
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
  const g = unlock(createGrid(layout));
  const cg = createCellGrid(g);
  colors.forEach((row, y) => {
    row.forEach((color, x) => {
      const cell = getCell(cg, x, y);
      if (color !== Color.None) {
        cell!.color = color;
        cell!.randomize = false;
      }
    });
  });
  return g;
};

export const matchesOwned = (grid: Cell[], owned: string): boolean => {
  const cg = createCellGrid(grid);
  let match = true;
  owned.split(/\n/).forEach((line, y) => {
      line.split('').forEach((char, x) => {
        const cell = getCell(cg, x, y);
        if (char === '*') {
          if (cell!.owned === false) {
            match = false;
          }
        } else if (char === '-') {
          if (cell!.owned) {
            match = false;
          }
        }
      });
  });
  return match;
};

describe('Grid', () => {
  it('should initiatize', () => {
    const g = createTestGrid(
`BBB
BBR
BB-`);
    expect(owned(g).length).toBe(1);
    expect(getByColor(g, Color.Red).length).toBe(1);
    expect(getByOtherColor(g, Color.Red).length).toBe(7);
    expect(matchesOwned(g,
`*--
---
-- `)).toBe(true);
    expect(matchesOwned(g,
`-*-
**-
-- `)).toBe(false);
  });

  it('should colorize', () => {
    const g = createTestGrid(
`BBB
BBB
BBR`);

    const ng1 = colorize(g, Color.Blue).newCells;
    expect(matchesOwned(ng1,
`**-
*--
---`)).toBe(true);

    const ng2 = colorize(ng1, Color.Blue).newCells;
    expect(matchesOwned(ng2,
`***
**-
*--`)).toBe(true);

    const ng3 = colorize(ng2, Color.Blue).newCells;
    expect(matchesOwned(ng3,
`***
***
**-`)).toBe(true);

    const ng4 = colorize(ng3, Color.Blue).newCells;
    expect(matchesOwned(ng4,
`***
***
**-`)).toBe(true);
  });

  it('should colorize around a pattern', () => {
    const g = createTestGrid(
`BBB
--B
BBR`);

    const ng1 = colorize(g, Color.Blue).newCells;
    expect(matchesOwned(ng1,
`**-
  -
---`)).toBe(true);

    const ng2 = colorize(ng1, Color.Blue).newCells;
    expect(matchesOwned(ng2,
`***
  -
---`)).toBe(true);

    const ng3 = colorize(ng2, Color.Blue).newCells;
    expect(matchesOwned(ng3,
`***
  *
---`)).toBe(true);
  });

  it('should randomize', () => {
    const g = createTestGrid(
`BBB
BBB
BBB`);
    const ng = randomize(g);
    expect(getByColor(ng, Color.Blue).length).not.toBe(9);
  });
});
