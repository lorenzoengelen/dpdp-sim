export default class Order {
  constructor(id, x, y, q, e, l, s) {
    this.id = id;           // id
    this.x = x;             // x location
    this.y = y;             // y location
    this.q = q;             // +pickup / -delivery quantity
    this.e = e;             // earliest time
    this.l = l;             // latest time
    this.s = s;             // service time
  }
}