import Order from './order';
import {Realization} from './samples';
import {RoutePlan} from './models/plan';

export default class State {
  constructor() {
    this.k = null;            // decision point
    this.tk = null;           // decision time
    this.c = null;            // new customer
    this.C = new Array();     // customers
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
      .setNewCustomer(c)
      .setCustomers(C)
      .setRoutePlan(R);
  }

  addVehicle(xHomeLocation, yHomeLocation) {
    this.addRoute(xHomeLocation, yHomeLocation);
    return this;
  }

  addRoute(hx, hy) {
    this.R.addRoute(hx, hy);
    return this;
  }

  updateRouteInRoutePlan(updatedRoute) {
    this.R.updateRoute(updatedRoute);
    return this;
  }

  acceptCustomer(customer) {
    this.C.push(customer.accept());
    return this;
  }

  rejectCustomer(customer) {
    this.C.push(customer.reject());
    return this;
  }

  getRoutePlanWaitingTime() {
    return this.R.getPlanWaitingTime();
  }

  getRoutePlanServiceTime() {
    return this.R.getPlanServiceTime();
  }

  getRoutePlanTravelTime() {
    return this.R.getPlanTravelTime();
  }

  getRoutePlanExecutionTime() {
    return this.R.getPlanExecutionTime();
  }

  getRoutePlanCost() {
    // OBJECTIVE FUNCTION
    return this.getRoutePlanTravelTime();
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
    if (customer !== null) {
      const { k,
        alpha,
        announceTime,
        reactionTime,
        xPickupLocation,
        yPickupLocation,
        earliestPickupTime,
        latestPickupTime,
        pickupServiceTime,
        xDeliveryLocation,
        yDeliveryLocation,
        earliestDeliveryTime,
        latestDeliveryTime,
        deliveryServiceTime } = customer;
      this.c = Realization.init()
        .setk(k)
        .setAlpha(alpha)
        .setAnnounceTime(announceTime)
        .setPickupLocation(xPickupLocation, yPickupLocation)
        .setPickupTimeWindow(earliestPickupTime, latestPickupTime)
        .setPickupServiceTime(pickupServiceTime)
        .setDeliveryLocation(xDeliveryLocation, yDeliveryLocation)
        .setDeliveryTimeWindow(earliestDeliveryTime, latestDeliveryTime)
        .setDeliveryServiceTime(deliveryServiceTime);
    } else {
      this.c = customer;
    }
    return this;
  }

  setCustomers(customers) {
    customers.forEach(customer => {
      const { k,
        alpha,
        announceTime,
        reactionTime,
        xPickupLocation,
        yPickupLocation,
        earliestPickupTime,
        latestPickupTime,
        pickupServiceTime,
        xDeliveryLocation,
        yDeliveryLocation,
        earliestDeliveryTime,
        latestDeliveryTime,
        deliveryServiceTime } = customer;
      this.C.push(Realization.init()
        .setk(k)
        .setAlpha(alpha)
        .setAnnounceTime(announceTime)
        .setPickupLocation(xPickupLocation, yPickupLocation)
        .setPickupTimeWindow(earliestPickupTime, latestPickupTime)
        .setPickupServiceTime(pickupServiceTime)
        .setDeliveryLocation(xDeliveryLocation, yDeliveryLocation)
        .setDeliveryTimeWindow(earliestPickupTime, latestPickupTime)
        .setDeliveryServiceTime(deliveryServiceTime));
    });
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
} // endClass State