"use strict";
/**
 * !Pupi.js
 * Oscar Sobrevilla / oscar.sobrevilla@gmail.com
 * https://github.com/osobrevilla/pupijs
 * MIT License 2015
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        var points = [];
        var word = value.trim();
        searchY: for (var y = 0; y < this.data.length; y++) {
            for (var x = 0; x < this.data[y].length; x++) {
                for (var dirKey in Direction) {
                    points = this.doWalk(word, {
                        x: x,
                        y: y,
                    }, Direction[dirKey]);
                    if (points.length) {
                        break searchY;
                    }
                }
            }
        }
        return points;
    };
    Pupi.prototype.doWalk = function (word, point, direction) {
        var _this = this;
        var points = [];
        var letters = word.toUpperCase().trim().split("");
        var lettersLen = letters.length;
        var go = function (index) {
            var ls = letters[index];
            var lf = _this.data[point.y][point.x];
            if (ls == lf) {
                if (points.push(__assign({}, point)) === lettersLen) {
                    return;
                }
            }
            else {
                return;
            }
            _this.walkToDirection(direction, point);
            if (point.x >= 0 &&
                point.x < _this.limitX &&
                point.y >= 0 &&
                point.y < _this.limitY) {
                go(++index);
            }
        };
        go(0);
        if (points.length === lettersLen) {
            return points;
        }
        return [];
    };
    Pupi.prototype.walkToDirection = function (direction, point) {
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
    };
    return Pupi;
}());
exports.default = Pupi;
//# sourceMappingURL=Pupi.js.map