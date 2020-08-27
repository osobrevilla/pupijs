import Pupi, { PupiData, PupiPoint } from "../Pupi";
import matchOne from "./sounds/466554_1622836-lq.mp3";
import notFound from "./sounds/67454_754949-hq.mp3";

type CellMap = { [key: string]: { node: HTMLElement; value: string } };

const soap = document.querySelector("textarea");

const data = soap?.value
  .trim()
  .split(/\n/)
  .map((r) => r.trim().split(" "));

class Demo {
  private map: CellMap;
  private table: HTMLTableElement;
  private grid: HTMLDivElement | null;
  private matchAudio: HTMLAudioElement;
  private wrongAudio: HTMLAudioElement;
  private form: HTMLElement | null;
  private pupi: Pupi;
  constructor(pupi: Pupi) {
    this.pupi = pupi;
    this.form = document.querySelector("form");
    this.grid = document.querySelector(".grid");
    this.matchAudio = document.createElement("audio");
    this.wrongAudio = document.createElement("audio");

    this.wrongAudio.src = notFound;
    this.wrongAudio.preload = "true";

    this.matchAudio.src = matchOne;
    this.matchAudio.preload = "true";

    [this.table, this.map] = this.buildGrid(pupi.data);

    this.form?.addEventListener("submit", (event: Event) => {
      event.preventDefault();
      if (event.target && event.target) {
        const { search } = <HTMLFormElement>event.target;
        this.searchWord((<HTMLInputElement>search).value);
      }
    });

    document.querySelector(".grid")?.appendChild(this.table);
  }

  searchWord(word: string) {
    const points = this.pupi.find(word);
    if (points.length) {
      this.highlightPoints(points);
    } else {
      this.notFound();
    }
    return false;
  }

  private notFound(): void {
    this.grid?.classList.add("animate__shakeX");
    this.wrongAudio.play();
    setTimeout(() => this.grid?.classList.remove("animate__shakeX"), 500);
  }

  private highlightPoints(points: PupiPoint[]): void {
    const color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
    points.forEach(({ x, y }, index) => {
      setTimeout(() => {
        const { node } = this.map[x + "-" + y];
        node.style.backgroundColor = color;

        node.classList.add("hightlight");
        (this.matchAudio.cloneNode(true) as HTMLAudioElement).play();
      }, index * 250);
    });
  }

  private buildGrid(data: PupiData): [HTMLTableElement, CellMap] {
    const map: CellMap = {};
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

document.addEventListener(
  "DOMContentLoaded",
  () => new Demo(new Pupi(data as PupiData))
);
