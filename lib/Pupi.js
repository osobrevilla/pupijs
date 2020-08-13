"use strict";
/**
 * !Pupi.js
 * Oscar Sobrevilla / oscar.sobrevilla@gmail.com
 * https://github.com/osobrevilla/pupijs
 * MIT License 2015
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Directions = [
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
];
/** Pupi resolves an alphabet soup */
class Pupi {
    constructor(data) {
        this.data = [[]];
        this.data = data;
        this.limitX = data[0].length;
        this.limitY = data.length;
    }
    find(value) {
        let points = [];
        const word = value.trim();
        searchY: for (let y = 0; y < this.data.length; y++) {
            for (let x = 0; x < this.data[y].length; x++) {
                for (let dir of Directions) {
                    points = this.doWalk(word, {
                        x,
                        y,
                    }, dir);
                    if (points.length) {
                        break searchY;
                    }
                }
            }
        }
        return points;
    }
    doWalk(word, point, [x, y]) {
        const points = [];
        const letters = [...word.trim().toLowerCase()];
        const lettersLen = letters.length;
        const go = (index) => {
            const { data, limitX, limitY } = this;
            const wordChar = letters[index];
            const gridChar = data[point.y][point.x];
            if (wordChar == gridChar.toLowerCase()) {
                if (points.push({
                    ...point,
                }) === lettersLen) {
                    return;
                }
            }
            else {
                return;
            }
            point.x += x;
            point.y += y;
            if (point.x >= 0 &&
                point.x < limitX &&
                point.y >= 0 &&
                point.y < limitY) {
                go(++index);
            }
        };
        go(0);
        return points.length === lettersLen ? points : [];
    }
}
exports.default = Pupi;
//# sourceMappingURL=Pupi.js.map