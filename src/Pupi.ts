/**
 * !Pupi.js
 * Oscar Sobrevilla / oscar.sobrevilla@gmail.com
 * https://github.com/osobrevilla/pupijs
 * MIT License 2015
 */

enum Direction {
  RIGHT = "R",
  BOTTOM_RIGHT = "BR",
  BOTTOM = "B",
  BOTTOM_LEFT = "BL",
  LEFT = "L",
  TOP_LEFT = "TL",
  TOP = "T",
  TOP_RIGHT = "TR",
}

export declare type PupiData = [string[]];

export declare type PupiPoint = { x: number; y: number };

/** Pupi resolves an alphabet soup */

export default class Pupi {
  private data: PupiData = [[]];
  private limitX: number;
  private limitY: number;

  constructor(data: PupiData) {
    this.data = data;
    this.limitX = data[0].length;
    this.limitY = data.length;
  }

  find(value: string): PupiPoint[] {
    let points: PupiPoint[] = [],
      word = value.replace(/\s+/g, "");

    searchY: for (let y = 0; y < this.data.length; y++) {
      for (let x = 0; x < this.data[y].length; x++) {
        for (let dirKey in Direction) {
          points = this._walker(
            word,
            Direction[dirKey as keyof typeof Direction],
            x,
            y
          );
          if (points.length) {
            break searchY;
          }
        }
      }
    }
    return points;
  }
  private _walker(
    word: string,
    dir: Direction,
    x: number,
    y: number
  ): PupiPoint[] {
    let points: PupiPoint[] = [];
    const letters = word.toUpperCase().trim().split("");
    const lettersLen = letters.length;

    const go = (index: number) => {
      let ls = letters[index];
      let lf = this.data[y][x];

      if (ls == lf) {
        points.push({
          x,
          y,
        });
        if (points.length === lettersLen) {
          return;
        }
      } else {
        return;
      }

      const directions = {
        [Direction.TOP]: () => y--,
        [Direction.TOP_RIGHT]: () => (y--, x++),
        [Direction.RIGHT]: () => x++,
        [Direction.BOTTOM_RIGHT]: () => (y++, x++),
        [Direction.BOTTOM]: () => y++,
        [Direction.BOTTOM_LEFT]: () => (y++, x--),
        [Direction.LEFT]: () => x--,
        [Direction.TOP_LEFT]: () => (y--, x--),
      };

      directions[dir]();

      if (x >= 0 && x < this.limitX && y >= 0 && y < this.limitY) {
        go(++index);
      }
    };

    go(0);

    if (points.length === lettersLen) {
      return points;
    }

    return [];
  }
}
