export class Samples {
  constructor() {
    this.H = 0;
    this.paths = new Array();
  }

  static init() {
    return new Samples();
  }

  getH() {
    return this.H;
  }

  addPath(path) {
    this.paths.push(path);
    this.H++;
    return this;
  }
}; // endClass Samples

export class Path {
  constructor() {
    this.K = 0;
    this.path = new Array();
  }

  getK() {
    return this.K;
  }

  static init() {
    return new Path();
  }

  addRealization(realization) {
    this.path.push(realization);
    this.K++;
    return this;
  } 
}; // endClass Path

export class Realization {
  constructor() {
    this.k = null; // decision point
    this.alpha = null;
    this.announceTime = null;
    this.reactionTime = null;
    
    this.xPickupLocation = null;
    this.yPickupLocation = null;
    this.earliestPickupTime = null;
    this.latestPickupTime = null;
    this.pickupServiceTime = null;

    this.xDeliveryLocation = null;
    this.yDeliveryLocation = null;
    this.earliestDeliveryTime = null;
    this.latestDeliveryTime = null;
    this.deliveryServiceTime = null;
  }

  static init() {
    return new Realization();
  }

  setk(decisionPoint) {
    this.k = decisionPoint;
    return this;
  }

  setAlpha(int) {
    this.alpha = int;
    return this;
  }

  setAnnounceTime(time) {
    this.announceTime = time;
    this.reactionTime = this.latestPickupTime - this.announceTime;
    return this;
  }

  setPickupLocation(x, y) {
    this.xPickupLocation = x;
    this.yPickupLocation = y;
    return this;
  }

  setPickupTimeWindow(earliest, latest) {
    this.earliestPickupTime = earliest;
    this.latestPickupTime = latest;
    this.reactionTime = this.latestPickupTime - this.announceTime;
    return this;
  }

  setPickupServiceTime(duration) {
    this.pickupServiceTime = duration;
    return this;
  }

  setDeliveryLocation(x, y) {
    this.xDeliveryLocation = x;
    this.yDeliveryLocation = y;
    return this;
  }

  setDeliveryTimeWindow(earliest, latest) {
    this.earliestDeliveryTime = earliest;
    this.latestDeliveryTime = latest;
    return this;
  }

  setDeliveryServiceTime(duration) {
    this.deliveryServiceTime = duration;
    return this;
  }
}; // endClass Realization








