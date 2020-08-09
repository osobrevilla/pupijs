"use strict";
/**
 * !Pupi.js
 * Oscar Sobrevilla / oscar.sobrevilla@gmail.com
 * https://github.com/osobrevilla/pupijs
 * MIT License 2015
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Direction;
(function (Direction) {
    Direction["RIGHT"] = "R";
    Direction["BOTTOM_RIGHT"] = "BR";
    Direction["BOTTOM"] = "B";
    Direction["BOTTOM_LEFT"] = "BL";
    Direction["LEFT"] = "L";
    Direction["TOP_LEFT"] = "TL";
    Direction["TOP"] = "T";
    Direction["TOP_RIGHT"] = "TR";
})(Direction || (Direction = {}));
/** Pupi resolves an alphabet soup */
var Pupi = /** @class */ (function () {
    function Pupi(data) {
        this.data = [[]];
        this.data = data;
        this.limitX = data[0].length;
        this.limitY = data.length;
    }
    Pupi.prototype.find = function (value) {
        var points = [], word = value.replace(/\s+/g, "");
        searchY: for (var y = 0; y < this.data.length; y++) {
            for (var x = 0; x < this.data[y].length; x++) {
                for (var dirKey in Direction) {
                    points = this._walker(word, Direction[dirKey], x, y);
                    if (points.length) {
                        break searchY;
                    }
                }
            }
        }
        return points;
    };
    Pupi.prototype._walker = function (word, dir, x, y) {
        var _this = this;
        var points = [];
        var letters = word.toUpperCase().trim().split("");
        var lettersLen = letters.length;
        var go = function (index) {
            var _a;
            var ls = letters[index];
            var lf = _this.data[y][x];
            if (ls == lf) {
                points.push({
                    x: x,
                    y: y,
                });
                if (points.length === lettersLen) {
                    return;
                }
            }
            else {
                return;
            }
            var directions = (_a = {},
                _a[Direction.TOP] = function () { return y--; },
                _a[Direction.TOP_RIGHT] = function () { return (y--, x++); },
                _a[Direction.RIGHT] = function () { return x++; },
                _a[Direction.BOTTOM_RIGHT] = function () { return (y++, x++); },
                _a[Direction.BOTTOM] = function () { return y++; },
                _a[Direction.BOTTOM_LEFT] = function () { return (y++, x--); },
                _a[Direction.LEFT] = function () { return x--; },
                _a[Direction.TOP_LEFT] = function () { return (y--, x--); },
                _a);
            directions[dir]();
            if (x >= 0 && x < _this.limitX && y >= 0 && y < _this.limitY) {
                go(++index);
            }
        };
        go(0);
        if (points.length === lettersLen) {
            return points;
        }
        return [];
    };
    return Pupi;
}());
exports.default = Pupi;
//# sourceMappingURL=Pupi.js.map