import {Pickup, Delivery, Home} from './order';

// <== HARD CODED ==>
const START_HORIZON = 0;
const END_HORIZON = 28000000;

export class RoutePlan {
  constructor() {
    this.m = 0; // a fleet of m vehicles
    this.routes = new Array();
  }

  static init() {
    return new RoutePlan();
  }

  setm(m) {
    this.m = m;
    return this;
  }

  setRoutes(routes) {
    // this.routes = routes;
    routes.forEach(route => {
      const {id, xHomeLocation, yHomeLocation, visits} = route;
      this.routes.push(Route.init()
        .setId(id)
        .setHomeLocation(xHomeLocation, yHomeLocation)
        .setVisits(visits));
    });
    return this;
  }

  addRoute(xHomeLocation, yHomeLocation) {
    this.m++;
    this.routes.push(Route.init()
      .setId(this.m)
      .setHomeLocation(xHomeLocation, yHomeLocation)
      .setHomeVisits(xHomeLocation, yHomeLocation));
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
    return this;
  }

  setHomeVisits(x, y) {
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

  setVisits(visits) { // TODO
    visits.forEach(visit => {
      const { id,
        xLocation,
        yLocation,
        quantity,
        earliestServiceTime,
        latestServiceTime,
        serviceTimeDuration,
        arrivalTime,
        waitingTime } = visit;
      const pushOrder = order => {
        return order.init()
          .setId(id)
          .setLocation(xLocation, yLocation)
          .setQuantity(quantity)
          .setTimeWindow(earliestServiceTime, latestServiceTime)
          .setServiceTimeDuration(serviceTimeDuration)
          .setArrivalTime(arrivalTime);
      };
      if (id === 0) { 
        // HOME
        this.visits.push(pushOrder(Home));
      } else if (id > 0 && quantity === 1) { 
        // PICKUP
        this.visits.push(pushOrder(Pickup));
      } else { 
        // DELIVERY
        this.visits.push(pushOrder(Delivery));
      }
    });
    return this;
  }
}; // endClass Route