import {distance, travelTime, tt} from '../utils/utils';
import Order from './order';

export default function policy(state) {
  // CHEAPEST INSERTION HEURISTIC

  const {k, tk, c, C, R} = state;
  const {pe, pl, ps, px, py, de, dl, ds, dx, dy} = c;

  const pO = new Order(k, px, py, 1, pe, pl, ps, null, null, null); // pickup order
  const dO = new Order(k, dx, dy, -1, de, dl, ds, null, null, null); // delivery order

  // iterate over each route / vehicle
  for (let i = 0, lni = R.length; i < lni; i++) {
    const {vid, hx, hy, r} = R[i];
    // find feasible pickup insertion places
    // iterate over each order
    for (let j = 0, lnj = r.length - 1; j < lnj; j++) {
      const lO = r[j], rO = r[j + 1]; // left order, right order
      if (lO.b + lO.s + tt(lO.x, lO.y, pO.x, pO.y) <= pO.l) {
       // not violating time window of pickup order 
        if (lO.b + lO.s + tt(lO.x, lO.y, pO.x, pO.y) + pO.s + tt(pO.x, pO.y, rO.x, rO.y) <= rO.l) {
          // not violating time window of order on right hand side
          // feasible insertion spot for pickup order
          // insert pickup order, and search for feasible delivery spot
          // YOU WERE HERE
          const left = r.slice(0, j + 1)
          
          const right = r.slice(j + 1);
          
          const newr = [...r.slice(0, j + 1), pO, ...r.slice(j + 1)]
          
          console.log(newr);
        } // endif RIGHT TW VIOLATION check
      } // endif PICKUP TW VIOLATION check
    } // endfor route
  } // endfor Routes / Vehicles

    // for all possible insertions, find cheapest place insertion delivery
    // select the cheapest insertion for that route
  // select overall cheapest insertion

  // if no insertion is possible, insertion is infeasible and set alpha to zero

  const postDecisionState = state;
  return postDecisionState;
};