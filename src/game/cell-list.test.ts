import {
  createCell,
} from './cell';
import {
  hasLock,
  hasKey,
  hasRandomize,
} from './cell-list';

describe('CellList', () => {
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
});
