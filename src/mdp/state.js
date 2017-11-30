import Order from './order';
import {RoutePlan} from './models/plan';

export default class State {
  constructor() {
    this.k = null;            // decision point
    this.tk = null;           // decision time
    this.c = null;            // new customer
    this.C = new Array();     // accepted customers
    this.R = new RoutePlan()  // route plan
  }

  static init() {
    return new State();
  }

  static clone(state) {
    const {k, tk, c, C, R} = JSON.parse(JSON.stringify(state));
    return State.init()
      .setDecisionPoint(k)
      .setDecisionTime(tk)
      .setNewCustomer(c) // TODO
      .setAcceptedCustomers(C) // TODO
      .setRoutePlan(R);
  }

  setk(point) {
    this.k = point;
    return this;
  }

  setDecisionPoint(point) {
    this.setk(point);
    return this;
  }

  setDecisionTime(time) {
    this.tk = time;
    return this;
  }

  setNewCustomer(customer) {
    this.c = customer;
    return this;
  }

  setAcceptedCustomers(customers) {
    this.C = customers;
    return this;
  }

  setRoutePlan(plan) {
    const {m, routes} = plan;
    this.R = RoutePlan.init()
      .setm(m)
      .setRoutes(routes);
    return this;
  }

  getDecisionPoint() {
    return this.k;
  }

  getDecisionTime() {
    return this.tk;
  }

  getNewCustomer() {
    return this.c;
  }

  getAcceptedCustomers() {
    return this.C;
  }

  getRoutePlan() {
    return this.R;
  }

  addVehicle(xHomeLocation, yHomeLocation) {
    this.addRoute(xHomeLocation, yHomeLocation);
    return this;
  }

  addRoute(hx, hy) {
    this.R.addRoute(hx, hy);
    return this;
  }
} // endClass State