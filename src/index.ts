import Pupi, { PupiData, PupiPoint } from "./Pupi";

type CellMap = { [key: string]: { node: HTMLElement; value: string } };

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
  private map: CellMap;
  private table: HTMLTableElement;
  private grid: HTMLDivElement | null;
  private form: HTMLElement | null;
  private pupi: Pupi;

  constructor(pupi: Pupi) {
    this.pupi = pupi;
    this.form = document.querySelector("form");
    this.grid = document.querySelector(".grid");
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
    setTimeout(() => this.grid?.classList.remove("animate__shakeX"), 500);
  }

  private highlightPoints(points: PupiPoint[]): void {
    points.forEach(({ x, y }, index) => {
      setTimeout(() => {
        this.map[x + "-" + y].node.classList.add("hightlight");
      }, index * 50);
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
