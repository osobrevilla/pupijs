import Pupi, { PupiData, PupiPoint } from "./Pupi";

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

const pupi = new Pupi(data as PupiData);

const grid = (() => {
  const map: { [key: string]: { node: HTMLElement; value: string } } = {};
  const table = document.createElement("table");
  data.forEach((row, y) => {
    const rowNode = document.createElement("tr");
    table.append(rowNode);
    row.forEach((col, x) => {
      const node = document.createElement("td");
      const value = data[y][x];
      node.textContent = value;
      map[x + "-" + y] = {
        node,
        value,
      };
      rowNode.appendChild(node);
    });
  });
  return { table, map };
})();

const highlightPoints = (points: PupiPoint[]) => {
  points.forEach(({ x, y }) => {
    grid.map[x + "-" + y].node.classList.add("hightlight");
  });
};

const app = {
  searchWord(word: string) {
    const points = pupi.find(word);
    if (points) {
      highlightPoints(points);
    }
    return false;
  },
  init() {
    document
      .getElementById("pupiform")
      ?.addEventListener("submit", (event: Event) => {
        event.preventDefault();
        if (event.target && event.target) {
          const { search } = <HTMLFormElement>event.target;
          app.searchWord((<HTMLInputElement>search).value);
        }
      });
    document.getElementById("target")?.appendChild(grid.table);
  },
};

document.addEventListener("DOMContentLoaded", app.init);
