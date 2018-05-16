/*
 * PupiResolver.js
 * Oscar Sobrevilla / oscar.sobrevilla@gmail.com
 * https://github.com/osobrevilla/pupijs
 * MIT License 2015
 */

// Constructor
// @data: Array<Array>
function PupiResolver(data) {

    this.data = data;
    this.limitX = data[0].length;
    this.limitY = data.length;
}

PupiResolver.DIRs = {
    "right": 1,
    "bottom-right": 2,
    "bottom": 3,
    "bottom-left": 4,
    "left": 5,
    "top-left": 6,
    "top": 7,
    "top-right": 8
};

PupiResolver.prototype.find = function(value) {

    var points, word = value.replace(/\s+/g, ""),
        x, y, d;

    searchY: for (y in this.data) {
        for (x in this.data[y]) {
            for (d in PupiResolver.DIRs) {
                points = this._walker(word, PupiResolver.DIRs[d], 1 * x, 1 * y);
                if (points) {
                    break searchY;
                }
            }
        }
    }
    return points;
}

PupiResolver.prototype._walker = function(word, dir, x, y) {
    var points = [],
        letters = word.toUpperCase().split(""),
        lettersLen = letters.length;

    function go(index) {

        var ls = letters[index],
            lf = this.data[y][x];

        if (ls == lf) {
            points.push({
                x: x,
                y: y
            });
            if (points.length === lettersLen) {
                return;
            }
        } else {
            return;
        }

        switch (dir) {

            case 7: // TOP
                y--;
                break;

            case 8: // TOP RIGHT
                y--;
                x++;
                break;

            case 1: // RIGHT
                x++;
                break;

            case 2: // BOTTOM RIGHT
                y++;
                x++;
                break;

            case 3: // BOTTOM
                y++;
                break;

            case 4: // BOTTOM LEFT
                y++;
                x--;
                break;

            case 5: // LEFT
                x--;
                break;

            case 6: // TOP LEFT
                y--;
                x--;
                break;
        }

        if (x >= 0 && x < this.limitX && y >= 0 && y < this.limitY) {
            go.call(this, ++index);
        }
    }

    go.call(this, 0);

    if (points.length === lettersLen) {
        return points;
    }
}
