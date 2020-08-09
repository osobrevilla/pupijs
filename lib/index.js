"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Pupi_1 = __importDefault(require("./Pupi"));
var soap = "Z U R O A C Z A V A I U W D A\n            A T O G A M W E S X Q V L I R\n            O U D N G O N U Z L A T V M G\n            D M A S R E R U G Z J I H H E\n            J D U U Z A I B M O L O C O N\n            A H C U Y E K T K O Q P M M T\n            T S E E R A L W B S M D B O I\n            R L R K G E U I U V C P R Z N\n            A M A N A P U G H D Y D A I A\n            M H U Q V W R H A C A M S B O\n            O E T S K X E K Y R K Y I H K\n            T C X S R U P X S T A K L Q Y\n            E E L I L A X R Y I O P C K S\n            J C N H C A U R U G U A Y I V\n            V H C W B O A Y N L X K Z Y D";
var data = soap.split(/\n\s+/).map(function (r) { return r.split(" "); });
var pupi = new Pupi_1.default(data);
var grid = (function () {
    var map = {};
    var table = document.createElement("table");
    data.forEach(function (row, y) {
        var rowNode = document.createElement("tr");
        table.append(rowNode);
        row.forEach(function (col, x) {
            var node = document.createElement("td");
            var value = data[y][x];
            node.textContent = value;
            map[x + "-" + y] = {
                node: node,
                value: value,
            };
            rowNode.appendChild(node);
        });
    });
    return { table: table, map: map };
})();
var highlightPoints = function (points) {
    points.forEach(function (_a) {
        var x = _a.x, y = _a.y;
        grid.map[x + "-" + y].node.classList.add("hightlight");
    });
};
var app = {
    searchWord: function (word) {
        var points = pupi.find(word);
        if (points) {
            highlightPoints(points);
        }
        return false;
    },
    init: function () {
        var _a, _b;
        (_a = document
            .getElementById("pupiform")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
            event.preventDefault();
            if (event.target && event.target) {
                var search = event.target.search;
                app.searchWord(search.value);
            }
        });
        (_b = document.getElementById("target")) === null || _b === void 0 ? void 0 : _b.appendChild(grid.table);
    },
};
document.addEventListener("DOMContentLoaded", app.init);
//# sourceMappingURL=index.js.map