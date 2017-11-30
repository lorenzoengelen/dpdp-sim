import Order from './order';

// <== HARD CODED ==>
const START_HORIZON = 0;
const END_HORIZON = 28000000;

export default class State {
  constructor(k, tk, c, C, R) {
    this.k = k;             // decision point
    this.tk = tk;           // decision time
    this.c = c || null;     // new customer
    this.C = C || [];       // accepted customers
    this.R = R || [];       // route plan
  }

  static init() {
    return new State(0, 0);
  }

  addVehicle(hx, hy) {
    this.R.push({vid: this.R.length + 1, hx, hy, r: [new Order(0, hx, hy, 1, START_HORIZON, END_HORIZON, 0, 0, 0, 0), new Order(0, hx, hy, -1, START_HORIZON, END_HORIZON, 0, 0, 0, 0)]});
    return this;
  }
}