var x = Object.defineProperty;
var y = (r, e, t) => e in r ? x(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var o = (r, e, t) => (y(r, typeof e != "symbol" ? e + "" : e, t), t);
const w = [
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1]
];
class k {
  constructor(e) {
    o(this, "data", [[]]);
    o(this, "limitX");
    o(this, "limitY");
    this.data = e, this.limitX = e[0].length, this.limitY = e.length;
  }
  find(e) {
    let t = [];
    const h = e.trim();
    t:
      for (let i = 0; i < this.data.length; i++)
        for (let s = 0; s < this.data[i].length; s++)
          for (let l of w)
            if (t = this.doWalk(
              h,
              {
                x: s,
                y: i
              },
              l
            ), t.length)
              break t;
    return t;
  }
  doWalk(e, t, [h, i]) {
    const s = [], l = [...e.trim().toLowerCase()], n = l.length, a = (c) => {
      const { data: d, limitX: f, limitY: g } = this, m = l[c], u = d[t.y][t.x];
      if (m == u.toLowerCase()) {
        if (s.push({
          ...t
        }) === n)
          return;
      } else
        return;
      t.x += h, t.y += i, t.x >= 0 && t.x < f && t.y >= 0 && t.y < g && a(++c);
    };
    return a(0), s.length === n ? s : [];
  }
}
export {
  k as default
};
