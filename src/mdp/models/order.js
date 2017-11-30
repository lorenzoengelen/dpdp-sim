export class Order {
  constructor() {
    this.id = null;
    this.x = null;
    this.y = null;
    this.quantity = null;
    this.earliestTime = null;
    this.latestTime = null;
    this.serviceTime = null;
    this.arrivalTime = null;
    this.waitingTime = null;
  }
};

export class PickupOrder extends Order {
    constructor() {
        super();
    }
};

export class DeliveryOrder extends Order {
    constructor() {
        super();
    }
};

export class HomeOrder extends Order {
    constructor() {
        super();
    }
};