import Color from './colors';

export const randomizeColor = (cell: Cell) => {
  const options = [
    Color.Blue,
    Color.Green,
    Color.LightBlue,
    Color.Pink,
    Color.Red,
    Color.Yellow,
  ];
  cell.color = options[Math.floor(Math.random() * options.length)];
}

export const isSpecial = (cell: Cell): boolean => cell.key || cell.lock || cell.randomize;

export const createCell = (x: number, y: number): Cell => ({
  color: Color.None,
  owned: false,
  key: false,
  lock: false,
  randomize: false,
  x,
  y,
});

export default interface Cell {
  color: Color;
  owned: boolean;
  key: boolean;
  lock: boolean;
  randomize: boolean;
  x: number;
  y: number;
};
