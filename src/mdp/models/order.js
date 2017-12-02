export class Order {
  constructor() {
    this.id = null;
    this.xLocation = null;
    this.yLocation = null;
    this.quantity = null;
    this.earliestServiceTime = null;
    this.latestServiceTime = null;
    this.serviceTimeDuration = null;
    this.arrivalTime = null;
    this.waitingTime = null;
  }

  static init() {
    return new this();
  }

  static clone(order) {
    const { id,
        xLocation,
        yLocation,
        quantity,
        earliestServiceTime,
        latestServiceTime,
        serviceTimeDuration,
        arrivalTime } = order;
    return this.init()
        .setId(id)
        .setLocation(xLocation, yLocation)
        .setQuantity(quantity)
        .setTimeWindow(earliestServiceTime, latestServiceTime)
        .setServiceTimeDuration(serviceTimeDuration)
        .setArrivalTime(arrivalTime);
  }

  setId(orderId) {
    this.id = orderId;
    return this;
  }

  setLocation(x, y) {
    this.xLocation = x;
    this.yLocation = y;
    return this;
  }

  setQuantity(q) {
    this.quantity = q;
    return this;
  }

  setTimeWindow(earliest, latest) {
    this.earliestServiceTime = earliest;
    this.latestServiceTime = latest;
    return this;
  }

  setServiceTimeDuration(duration) {
    this.serviceTimeDuration = duration;
    return this;
  }

  setArrivalTime(time) {
    this.arrivalTime = time;
    this.waitingTime = Math.max(this.earliestServiceTime - this.arrivalTime, 0);
    return this;
  }
}; // endClass Order

export class Pickup extends Order {};

export class Delivery extends Order {};

export class Home extends Order {};