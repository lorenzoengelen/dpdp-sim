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
    return new State(0, 0);
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
    return this;
  }

  setAcceptedCustomers(customers) {
    return this;
  }

  setRoutePlan(plan) {
    return this;
  }

  addVehicle(xHomeLocation, yHomeLocation) {
    this.addRoute(xHomeLocation, yHomeLocation);
    return this;
  }

  addRoute(hx, hy) {
    this.R.addRoute(hx, hy);
    return this;
  }
}