import {distance, travelTime, tt} from '../utils/utils';
import State from './state';
import {Route} from './models/plan';
import {Pickup, Delivery} from './models/order';

// MYOPIC POLICY - CHEAPEST INSERTION HEURISTIC
export const myopic = decisionState => {

  // set CUSTOMER and ROUTE PLAN
  const { c, R } = decisionState; 
  // create new POST-DECISION STATE
  const postDecisionState = State.clone(decisionState)
    .setNewCustomer(null);

  // set amount VEHICLES and planned ROUTES
  const { m, routes } = R;

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

// SERVICE REGION PARTITIONING or GEOGRAPHIC DISTRICTING
export const geographicDistricting = (thresholdValue, mayRelaxDistricts) => {
  return decisionState => {
    const THRESHOLD_VALUE = thresholdValue;
    const RELAX_DISTRICTS = mayRelaxDistricts;
    
    const { c, R } = decisionState;
    const { m, routes } = R;
    const { xPickupLocation, yPickupLocation, xDeliveryLocation, yDeliveryLocation } = c;

    const postDecisionState = State.clone(decisionState)
      .setNewCustomer(null);

    let routeInDistrictUpdateCost = Infinity;
    let routeInDistrictToUpdate = null;

    let routeOutsideDistrictUpdateCost = Infinity;
    let routeOutsideDistrictToUpdate = null;

    for (let i = 0; i < m; i++) {
      const plannedRoute = routes[i];
      const { xHomeLocation, yHomeLocation } = plannedRoute;
      const newRoute = plannedRoute.cheapestInsertion(c);
      if (newRoute.getNumberOfCustomerVisits() > plannedRoute.getNumberOfCustomerVisits()) {

        // if (Math.abs(xDeliveryLocation - xHomeLocation) <= THRESHOLD_VALUE && Math.abs(yDeliveryLocation - yHomeLocation) <= THRESHOLD_VALUE) {
        if (distance(xHomeLocation, yHomeLocation, xDeliveryLocation, yDeliveryLocation) <= THRESHOLD_VALUE) {
          // PICKUP IN DISTRICT
          if (newRoute.getRouteCost() - plannedRoute.getRouteCost() < routeInDistrictUpdateCost) {
            routeInDistrictUpdateCost = newRoute.getRouteCost() - plannedRoute.getRouteCost();
            routeInDistrictToUpdate = newRoute;
          } // endif 

        } else if (RELAX_DISTRICTS && !routeInDistrictToUpdate) {
          // PICKUP NOT IN DISTRICT & RELAXATION ALLOWED
          if (newRoute.getRouteCost() - plannedRoute.getRouteCost() < routeOutsideDistrictUpdateCost) {
            routeOutsideDistrictUpdateCost = newRoute.getRouteCost() - plannedRoute.getRouteCost();
            routeOutsideDistrictToUpdate = newRoute;
          } // endif

        } // endif

      } // endif
    } // endfor

    if (routeInDistrictToUpdate) {
      console.log('CUSTOMER ACCEPTED (IN DISTRICT)');
      postDecisionState.updateRouteInRoutePlan(routeInDistrictToUpdate)
        .acceptCustomer(c);
    } else if (routeOutsideDistrictToUpdate) {
      console.log('CUSTOMER ACCEPTED (OUTSIDE DISTRICT)');
      postDecisionState.updateRouteInRoutePlan(routeOutsideDistrictToUpdate)
        .acceptCustomer(c);
    } else {
      console.log('CUSTOMER REJECTED');
      postDecisionState.rejectCustomer(c);
    }

    return postDecisionState;
  };
};











