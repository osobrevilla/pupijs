/**
 * !Pupi.js
 * Oscar Sobrevilla / oscar.sobrevilla@gmail.com
 * https://github.com/osobrevilla/pupijs
 * MIT License 2015
 */

type Direction = [number, number];

const Directions = [
  [0, -1], // TOP
  [1, -1], // TOP_RIGHT
  [1, 0], // RIGHT
  [1, 1], // RIGHT_BOTTOM
  [0, 1], // BOTTOM
  [-1, 1], // LEFT_BOTTOM
  [-1, 0], // LEFT
  [-1, -1], // LEFT_TOP
] as Direction[];

export declare type PupiData = [string[]];

export declare type PupiPoint = { x: number; y: number };

/** Pupi resolves an alphabet soup */

export default class Pupi {
  readonly data: PupiData = [[]];
  private limitX: number;
  private limitY: number;

  constructor(data: PupiData) {
    this.data = data;
    this.limitX = data[0].length;
    this.limitY = data.length;
  }

  find(value: string): PupiPoint[] {
    let points: PupiPoint[] = [];
    const word = value.trim();

    searchY: for (let y = 0; y < this.data.length; y++) {
      for (let x = 0; x < this.data[y].length; x++) {
        for (let dir of Directions) {
          points = this.doWalk(
            word,
            {
              x,
              y,
            },
            dir
          );
          if (points.length) {
            break searchY;
          }
        }
      }
    }
    return points;
  }
  private doWalk(
    word: string,
    point: PupiPoint,
    [x, y]: Direction
  ): PupiPoint[] {
    const points: PupiPoint[] = [];
    const letters = [...word.trim().toLowerCase()];
    const lettersLen = letters.length;

    const go = (index: number) => {
      const { data, limitX, limitY } = this;
      const wordChar = letters[index];
      const gridChar = data[point.y][point.x];

      if (wordChar == gridChar.toLowerCase()) {
        if (
          points.push({
            ...point,
          }) === lettersLen
        ) {
          return;
        }
      } else {
        return;
      }

      point.x += x;
      point.y += y;

      if (
        point.x >= 0 &&
        point.x < limitX &&
        point.y >= 0 &&
        point.y < limitY
      ) {
        go(++index);
      }
    };

    go(0);

    return points.length === lettersLen ? points : [];
  }
}
