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

  const routeToUpdate = null;

  // iterate over ROUTES
  for (let i = 0; i < 1/*m*/; i++) {
    const plannedRoute = routes[i];
    // return new route after CHEAPEST INSERTION
    const newRoute = plannedRoute.cheapestInsertion(c);


  }

  return 'post-decision state';
};













