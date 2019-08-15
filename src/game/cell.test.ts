import {
  createCell,
  randomizeColor,
  isSpecial,
} from './cell';
import Color from './colors';

describe('cell', () => {
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
