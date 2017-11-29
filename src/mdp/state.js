export default class State {
  constructor(k, tk, c) {
    this.k = k;             // decision point
    this.tk = tk;           // decision time
    this.c = null || c;     // new customer
    this.C = [];            // accepted customers
    this.R = [];            // route plan
  }

  static init() {
    return new State(0, 0);
  }

  addVehicle(hx, hy) {
    this.R.push({vid: this.R.length + 1, hx, hy, r: []});
    return this;
  }
}