export default class Order {
  constructor(id, q, e, l, s) {
    this.id = id;           // id
    this.q = q;             // +pickup / -delivery quantity
    this.e = e;             // earliest time
    this.l = l;             // latest time
    this.s = s;             // service time
  }
}