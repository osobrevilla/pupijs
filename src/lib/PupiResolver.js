/*
 * PupiResolver.js
 * Oscar Sobrevilla / oscar.sobrevilla@gmail.com
 * https://github.com/osobrevilla/pupijs
 * MIT License 2015
 */

/**
 * @typedef {Array.<Array.<string>>} PupiResolverData
 */

const RIGHT = 1;
const BOTTOM_RIGHT = 2;
const BOTTOM = 3;
const BOTTOM_LEFT = 4;
const LEFT = 5;
const TOP_LEFT = 6;
const TOP = 7;
const TOP_RIGHT = 8;

const DIRECTIONS = {
  RIGHT,
  BOTTOM_RIGHT,
  BOTTOM,
  BOTTOM_LEFT,
  LEFT,
  TOP_LEFT,
  TOP,
  TOP_RIGHT
};

/** PupiResolver resolves an alphabet soup */

class PupiResolver {
  /**
   * Create a instance of PupiResolver
   * @param  {PupiResolverData} data two dimension array with data
   */
  constructor(data) {
    /**
     * @type PupiResolverData
     */
    this.data = data;
    this.limitX = data[0].length;
    this.limitY = data.length;
  }

  find(value) {
    let points,
      word = value.replace(/\s+/g, "");

    searchY: for (let y in this.data) {
      for (let x in this.data[y]) {
        for (let d in DIRECTIONS) {
          points = this._walker(word, DIRECTIONS[d], 1 * x, 1 * y);
          if (points) {
            break searchY;
          }
        }
      }
    }
    return points;
  }
  _walker(word, dir, x, y) {
    var points = [],
      letters = word.toUpperCase().split(""),
      lettersLen = letters.length;

    function go(index) {
      var ls = letters[index],
        lf = this.data[y][x];

      if (ls == lf) {
        points.push({
          x,
          y
        });
        if (points.length === lettersLen) {
          return;
        }
      } else {
        return;
      }

      const directions = {
        [TOP]: () => y--,
        [TOP_RIGHT]: () => (y--, x++),
        [RIGHT]: () => x++,
        [BOTTOM_RIGHT]: () => (y++, x++),
        [BOTTOM]: () => y++,
        [BOTTOM_LEFT]: () => (y++, x--),
        [LEFT]: () => x--,
        [TOP_LEFT]: () => (y--, x--)
      };

      directions[dir]();

      if (x >= 0 && x < this.limitX && y >= 0 && y < this.limitY) {
        go.call(this, ++index);
      }
    }

    go.call(this, 0);

    if (points.length === lettersLen) {
      return points;
    }
  }
}

export default PupiResolver;
