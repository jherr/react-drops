import {
  createGrid,
  unlock,
  createCellGrid,
  getCell,
  owned,
  getByColor,
  getByOtherColor,
  colorize,
  hasLock,
  hasKey,
  hasRandomize,
  randomize,
  Color,
  createCell,
  placeColor,
  calculateGameState,
  GameState,
  randomizeColor,
  isSpecial,
} from './game';

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

describe('Game', () => {
  it('should initiatize', () => {
    const grid = createTestGrid(
`ABB
BBB
BB-`);
    const ng = placeColor(grid, Color.Red);
    expect(getByColor(ng, Color.Red).length).toBe(1);
  });

  it('should handle locks', () => {
    const grid = createTestGrid(
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
    const grid = createTestGrid(
`ABB
BBR
BB-`);
    const cg = createCellGrid(grid);
    getCell(cg, 1, 0)!.randomize = true;
    const ng = placeColor(grid, Color.Blue);
    expect(getByColor(ng, Color.Blue).length).not.toBe(7);
  });

  it('should handle a win', () => {
    const grid = createTestGrid(
`ABB
BBB
BBB`);
    const ng = placeColor(grid, Color.Blue);
    expect(calculateGameState(ng, Color.Blue, 25)).toBe(GameState.Won);
  });

  it('should handle a loss through no more of the target color', () => {
    const grid = createTestGrid(
`ARR
RRR
RRR`);
    expect(calculateGameState(grid, Color.Blue, 25)).toBe(GameState.Lost);
  });

  it('should handle a loss through no more turns', () => {
    const grid = createTestGrid(
`ARB
RRB
BBB`);
    const ng = placeColor(grid, Color.Blue);
    expect(calculateGameState(ng, Color.Blue, 1)).toBe(GameState.Lost);
  });
});

describe('cell basics', () => {
  it('should pick a random color', () => {
    const cell = createCell(0, 0);
    randomizeColor(cell);
    expect(cell.color).not.toBe(Color.Any);
  });

  it('should tell if a cell is special', () => {
    const cell = createCell(0, 0);
    expect(isSpecial(cell)).not.toBe(true);
    cell.lock = true;
    expect(isSpecial(cell)).toBe(true);
  });
});

describe('Cell list basics', () => {
  it('finds lock', () => {
    const lock = createCell(1, 1);
    lock.lock = true;
    const cl = [
      lock,
      createCell(0, 0),
      createCell(1, 0),
    ];
    expect(hasLock(cl)).toBe(true);
    expect(hasKey(cl)).toBe(false);
    expect(hasRandomize(cl)).toBe(false);
    expect(hasLock([
      createCell(0, 0),
      createCell(1, 0),
    ])).toBe(false);
  });

  it('finds key', () => {
    const key = createCell(1, 1);
    key.key = true;
    const cl = [
      key,
      createCell(0, 0),
      createCell(1, 0),
    ];
    expect(hasLock(cl)).toBe(false);
    expect(hasKey(cl)).toBe(true);
    expect(hasRandomize(cl)).toBe(false);
    expect(hasKey([
      createCell(0, 0),
      createCell(1, 0),
    ])).toBe(false);
  });

  it('finds randomize', () => {
    const randomize = createCell(1, 1);
    randomize.randomize = true;
    const cl = [
      randomize,
      createCell(0, 0),
      createCell(1, 0),
    ];
    expect(hasLock(cl)).toBe(false);
    expect(hasKey(cl)).toBe(false);
    expect(hasRandomize(cl)).toBe(true);
    expect(hasRandomize([
      createCell(0, 0),
      createCell(1, 0),
    ])).toBe(false);
  });

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
