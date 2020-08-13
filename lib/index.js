"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pupi_1 = __importDefault(require("./Pupi"));
const soap = `Z U R O A C Z A V A I U W D A
            A T O G A M W E S X Q V L I R
            O U D N G O N U Z L A T V M G
            D M A S R E R U G Z J I H H E
            J D U U Z A I B M O L O C O N
            A H C U Y E K T K O Q P M M T
            T S E E R A L W B S M D B O I
            R L R K G E U I U V C P R Z N
            A M A N A P U G H D Y D A I A
            M H U Q V W R H A C A M S B O
            O E T S K X E K Y R K Y I H K
            T C X S R U P X S T A K L Q Y
            E E L I L A X R Y I O P C K S
            J C N H C A U R U G U A Y I V
            V H C W B O A Y N L X K Z Y D`;
const data = soap.split(/\n\s+/).map((r) => r.split(" "));
class Demo {
    constructor(pupi) {
        var _a, _b;
        this.pupi = pupi;
        this.form = document.querySelector("form");
        this.grid = document.querySelector(".grid");
        [this.table, this.map] = this.buildGrid(pupi.data);
        (_a = this.form) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (event) => {
            event.preventDefault();
            if (event.target && event.target) {
                const { search } = event.target;
                this.searchWord(search.value);
            }
        });
        (_b = document.querySelector(".grid")) === null || _b === void 0 ? void 0 : _b.appendChild(this.table);
    }
    searchWord(word) {
        const points = this.pupi.find(word);
        if (points.length) {
            this.highlightPoints(points);
        }
        else {
            this.notFound();
        }
        return false;
    }
    notFound() {
        var _a;
        (_a = this.grid) === null || _a === void 0 ? void 0 : _a.classList.add("animate__shakeX");
        setTimeout(() => { var _a; return (_a = this.grid) === null || _a === void 0 ? void 0 : _a.classList.remove("animate__shakeX"); }, 500);
    }
    highlightPoints(points) {
        points.forEach(({ x, y }, index) => {
            setTimeout(() => {
                this.map[x + "-" + y].node.classList.add("hightlight");
            }, index * 50);
        });
    }
    buildGrid(data) {
        const map = {};
        const table = document.createElement("table");
        data.forEach((row, y) => {
            const rowNode = document.createElement("tr");
            table.append(rowNode);
            row.forEach((col, x) => {
                const node = document.createElement("td");
                const value = data[y][x];
                node.innerHTML = `<svg viewBox="0 0 20 20"><text x="3.5" y="18">${value}</text></svg>`;
                map[x + "-" + y] = {
                    node,
                    value,
                };
                rowNode.appendChild(node);
            });
        });
        return [table, map];
    }
}
document.addEventListener("DOMContentLoaded", () => new Demo(new Pupi_1.default(data)));
//# sourceMappingURL=index.js.map