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
    let points: PupiPoint[] = [];
    const word = value.trim();

    searchY: for (let y = 0; y < this.data.length; y++) {
      for (let x = 0; x < this.data[y].length; x++) {
        for (let dirKey in Direction) {
          points = this.doWalk(
            word,
            {
              x,
              y,
            },
            Direction[dirKey as keyof typeof Direction]
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
    direction: Direction
  ): PupiPoint[] {
    const points: PupiPoint[] = [];
    const letters = word.toUpperCase().trim().split("");
    const lettersLen = letters.length;

    const go = (index: number) => {
      const ls = letters[index];
      const lf = this.data[point.y][point.x];

      if (ls == lf) {
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

      this.walkToDirection(direction, point);

      if (
        point.x >= 0 &&
        point.x < this.limitX &&
        point.y >= 0 &&
        point.y < this.limitY
      ) {
        go(++index);
      }
    };

    go(0);

    if (points.length === lettersLen) {
      return points;
    }

    return [];
  }

  private walkToDirection(direction: Direction, point: PupiPoint): void {
    switch (direction) {
      case Direction.TOP:
        point.y--;
        break;
      case Direction.TOP_RIGHT:
        point.y--, point.x++;
        break;
      case Direction.RIGHT:
        point.x++;
        break;
      case Direction.BOTTOM_RIGHT:
        point.y++, point.x++;
        break;
      case Direction.BOTTOM:
        point.y++;
        break;
      case Direction.BOTTOM_LEFT:
        point.y++, point.x--;
        break;
      case Direction.LEFT:
        point.x--;
        break;
      case Direction.TOP_LEFT:
        point.y--, point.x--;
        break;
      default:
        break;
    }
  }
}
