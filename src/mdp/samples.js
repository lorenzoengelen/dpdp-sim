export class Samples {
  constructor() {
    this.H = 0;
    this.samples = [];
  }

  static init() {
    return new Samples();
  }

  addPath(path) {
    this.samples.push(path);
    return this;
  }
};

export class Path {
  constructor() {
    this.K = 0;
    this.path = [];
  }

  static init() {
    return new Path();
  }

  addRealization(realization) {
    this.path.push(realization);
    return this;
  } 
};

export class Realization {
  constructor() {
    this.k = null;
    this.announceTime = null;
    this.xPickupLocation = null;
    this.yPickupLocation = null;
    this.pickupServiceTime = null;
    this.xDeliveryLocation = null;
    this.yDeliveryLocation = null;
    this.deliveryServiceTime = null;
  }
}