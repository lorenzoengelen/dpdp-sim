const TRAVEL_SPEED = 50; // constant travel speed of 50 km/h
const MS_IN_HOUR = 3600000;

// EUCLIDEAN DISTANCE
export function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2));
};

// TRAVEL TIME
export function travelTime(x1, y1, x2, y2) {
  return distance(x1, y1, x2, y2) / TRAVEL_SPEED * MS_IN_HOUR;
};

export const tt = travelTime;