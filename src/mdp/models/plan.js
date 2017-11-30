import {Pickup, Delivery, Home} from './order';

// <== HARD CODED ==>
const START_HORIZON = 0;
const END_HORIZON = 28000000;

export class RoutePlan {
  constructor() {
    this.m = 0; // a fleet of m vehicles
    this.routes = new Array();
  }

  addRoute(xHomeLocation, yHomeLocation) {
    this.m++;
    this.routes.push(Route.init()
      .setId(this.m)
      .setHomeLocation(xHomeLocation, yHomeLocation));
    return this;
  }
}; // endClass RoutePlan

export class Route {
  constructor() {
    this.id = null;
    this.xHomeLocation = null;
    this.yHomeLocation = null;
    this.visits = new Array();
  }

  static init() {
    return new Route();
  }

  setId(id) {
    this.id = id;
    return this;
  }

  setHomeLocation(x, y) {
    this.xHomeLocation = x;
    this.yHomeLocation = y;
    // start HOME
    this.visits.push(Home.init()
      .setId(0)
      .setLocation(x, y)
      .setQuantity(1)
      .setTimeWindow(START_HORIZON, END_HORIZON)
      .setServiceTimeDuration(0)
      .setArrivalTime(0));
    // end HOME
    this.visits.push(Home.init()
      .setId(0)
      .setLocation(x, y)
      .setQuantity(-1)
      .setTimeWindow(START_HORIZON, END_HORIZON)
      .setServiceTimeDuration(0)
      .setArrivalTime(0));
      
    return this;
  }
}; // endClass Route