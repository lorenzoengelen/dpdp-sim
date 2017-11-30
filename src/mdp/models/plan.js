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
};

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

  addHomeLocations() {

  }

  addVisit(order) {

  }
};