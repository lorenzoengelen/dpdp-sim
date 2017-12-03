import {distance, travelTime, tt} from '../utils/utils';
import State from './state';
import {Route} from './models/plan';
import {Pickup, Delivery} from './models/order';

// MYOPIC POLICY - CHEAPEST INSERTION HEURISTIC
export const myopic = decisionState => {

  // set CUSTOMER and ROUTE PLAN
  const {c, R} = decisionState; 
  // create new POST-DECISION STATE
  const postDecisionState = State.clone(decisionState)
    .setNewCustomer(null);

  // set amount VEHICLES and planned ROUTES
  const {m, routes} = R;

  let routeUpdateCost = Infinity;
  let routeToUpdate = null;

  // iterate over ROUTES
  for (let i = 0; i < m; i++) {
    const plannedRoute = routes[i];
    // return new route after CHEAPEST INSERTION
    const newRoute = plannedRoute.cheapestInsertion(c);
    // if customer is inserted, feasible insertion
    if (newRoute.getNumberOfCustomerVisits() > plannedRoute.getNumberOfCustomerVisits()) {
      // change route to update if lower costs
      if (newRoute.getRouteCost() - plannedRoute.getRouteCost() < routeUpdateCost) {
        routeUpdateCost = newRoute.getRouteCost() - plannedRoute.getRouteCost();
        routeToUpdate = newRoute;
      } // endif routeToUpdate
    } // endif feasible insertion
  } // endfor iterate over m routes

  // UPDATE a specific ROUTE
  if (routeToUpdate) {
    // CUSTOMER ACCEPTED
    console.log('CUSTOMER ACCEPTED');
    postDecisionState.updateRouteInRoutePlan(routeToUpdate)
      .acceptCustomer(c);
  } else {
    // CUSTOMER REJECTED
    console.log('CUSTOMER REJECTED');
    postDecisionState.rejectCustomer(c);
  } // endif UPDATE ROUTE and ACCEPT/REJECT CUSTOMER

  return postDecisionState;
};













