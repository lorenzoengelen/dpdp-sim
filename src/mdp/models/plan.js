import { Order, Pickup, Delivery, Home } from './order';
import { distance, tt } from '../../utils/utils';

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
    this.h = 0; // customer visits assigned to vehicle
    this.xHomeLocation = null;
    this.yHomeLocation = null;
    this.visits = new Array();
  }

  static init() {
    return new Route();
  }

  static clone(route) {
    const { id, h, xHomeLocation, yHomeLocation, visits } = JSON.parse(JSON.stringify(route));
    return Route.init()
      .setId(id)
      .seth(h)
      .setHomeLocation(xHomeLocation, yHomeLocation)
      .setVisits(visits);
  }

  cheapestInsertion(customer) {
    const { newPickup, newDelivery } = this.newPickupAndDelivery(customer);
    const { h } = this;

    console.log('this', this);

    for (let p = 0; p < h + 1; p++) {
      // check feasibility to insert new PICKUP
      if (this.feasibleInsertion(p, newPickup)) {
        const routeWithPickup = Route.clone(this)
          .insertPickup(p, newPickup);
        const { h } = routeWithPickup;

        for (let d = p + 1; d < h + 1; d++) {
          // check feasibility to insert new DELIVERY after according PICKUP
          if (routeWithPickup.feasibleInsertion(d, newDelivery)) {
            const routeWithPickupAndDelivery = Route.clone(routeWithPickup)
              .insertDelivery(d, newDelivery);

            console.log('with pickup and delivery', routeWithPickupAndDelivery);

          } // endif delivery feasibility
        }// endfor iterate over delivery insertion spots

      } // endif pickup feasibility
    } // endfor iterate over pickup insertion spots

    // return new route
    return Route.clone(this);
  }

  feasibleInsertion(afterIndex, newOrder) {
    const temporaryRoute = Route.clone(this)
      .insertOrder(afterIndex, newOrder);
    const { h, visits } = temporaryRoute;

    const checkTimeWindowViolation = i => {
      const { arrivalTime, latestServiceTime } = visits[i];
      let violation = false;
      if (arrivalTime > latestServiceTime) return true;
      if (i < h + 1) {
        violation = checkTimeWindowViolation(i + 1);
      }
      return violation;
    };
    const timeWindowViolation = checkTimeWindowViolation(afterIndex + 1);
    return !timeWindowViolation;
  }

  insertOrder(afterIndex, order) {
    let newInsert;
    order.quantity === 1 ? newInsert = Pickup.clone(order) : newInsert = Delivery.clone(order);
    this.visits.splice(afterIndex + 1, 0, newInsert);
    this.seth(this.h + 1);
    this.updateArrivalTimeAndWaitingTime(afterIndex);
    return this;
  }

  updateArrivalTimeAndWaitingTime(startIndex) {
    const updateArrivalTime = (index, newArrivalTime) => {
      newArrivalTime = newArrivalTime || this.visits[index].arrivalTime;
      this.visits[index].setArrivalTime(newArrivalTime);
      if (index !== this.visits.length - 1) {
        const { arrivalTime, waitingTime, serviceTimeDuration } = this.visits[index];
        const nextArrivalTime = arrivalTime + waitingTime + serviceTimeDuration + this.visits[index].getTravelTimeTo(this.visits[index + 1]);
        updateArrivalTime(index + 1, nextArrivalTime); 
      }
    };
    updateArrivalTime(startIndex);
    return this;
  }

  insertPickup(afterIndex, pickup) {
    this.insertOrder(afterIndex, pickup);
    return this;
  }

  insertDelivery(afterIndex, delivery) {
    this.insertOrder(afterIndex, delivery);
    return this;
  }

  newPickupAndDelivery(customer) {
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
    const newPickup = Pickup.init()
      .setId(k)
      .setLocation(xPickupLocation, yPickupLocation)
      .setQuantity(1)
      .setTimeWindow(earliestPickupTime, latestPickupTime)
      .setServiceTimeDuration(pickupServiceTime);
    const newDelivery = Delivery.init()
      .setId(k)
      .setLocation(xDeliveryLocation, yDeliveryLocation)
      .setQuantity(-1)
      .setTimeWindow(earliestDeliveryTime, latestDeliveryTime)
      .setServiceTimeDuration(deliveryServiceTime);
    return { newPickup, newDelivery };
  }

  setId(id) {
    this.id = id;
    return this;
  }

  seth(h) {
    this.h = h;
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