import Pupi from "../src/Pupi";
import matchOne from "./sounds/466554_1622836-lq.mp3";
import notFound from "./sounds/67454_754949-hq.mp3";
const soap = document.querySelector("textarea");
const data = soap?.value
    .trim()
    .split(/\n/)
    .map((r) => r.trim().split(" "));
class Demo {
    map;
    table;
    grid;
    matchAudio;
    wrongAudio;
    form;
    pupi;
    constructor(pupi) {
        this.pupi = pupi;
        this.form = document.querySelector("form");
        this.grid = document.querySelector(".grid");
        this.matchAudio = document.createElement("audio");
        this.wrongAudio = document.createElement("audio");
        this.wrongAudio.src = notFound;
        this.wrongAudio.preload = "auto";
        this.matchAudio.src = matchOne;
        this.matchAudio.preload = "auto";
        [this.table, this.map] = this.buildGrid(pupi.data);
        this.form?.addEventListener("submit", (event) => {
            event.preventDefault();
            if (event.target && event.target) {
                const { search } = event.target;
                this.searchWord(search.value);
            }
        });
        document.querySelector(".grid")?.appendChild(this.table);
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
        this.grid?.classList.add("animate__shakeX");
        this.wrongAudio.play();
        setTimeout(() => this.grid?.classList.remove("animate__shakeX"), 500);
    }
    highlightPoints(points) {
        const color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
        points.forEach(({ x, y }, index) => {
            setTimeout(() => {
                const { node } = this.map[x + "-" + y];
                node.style.backgroundColor = color;
                node.classList.add("hightlight");
                this.matchAudio.cloneNode(true).play();
            }, index * 250);
        });
    }
    buildGrid(data) {
        const map = {};
        const table = document.createElement("table");
        data.forEach((row, y) => {
            const rowNode = document.createElement("tr");
            table.append(rowNode);
            row.forEach((_, x) => {
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
document.addEventListener("DOMContentLoaded", () => new Demo(new Pupi(data)));
