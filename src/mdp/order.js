export default class Order {
  constructor(id, x, y, q, e, l, s, a, w, b) {
    this.oid = id;          // id
    this.x = x;             // x location
    this.y = y;             // y location
    this.q = q;             // +pickup / -delivery quantity
    this.e = e;             // earliest time
    this.l = l;             // latest time
    this.s = s;             // service time
    this.a = a;             // arrival time
    this.w = w;             // waiting time
    this.b = b;             // begin servicing
  }
}