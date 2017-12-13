// GENERATOR FOR D-PDPTW SCENARIOS
// - dynamism
// - urgency
// - scale
// - instances

import GeneratorSettings from './settings';

const THREAD_SLEEP_DURATION = 100;
const MS_IN_MIN = 60000;
const MS_IN_H = 60 * MS_IN_MIN;
const TICK_SIZE = 1000;
const BOSCOE_STREET_NEWORK = 1.5;
const VEHICLE_SPEED_KMH = 30 / BOSCOE_STREET_NEWORK; // Boscoe et al. (2012)

const AREA_WIDTH = 10;
const ORDERS_PER_HOUR = 25;

const MAXIMUM_TRAVEL_TIME = Math.sqrt(Math.pow(AREA_WIDTH, 2) + Math.pow(AREA_WIDTH, 2)) / VEHICLE_SPEED_KMH * MS_IN_H; // equal to travel time of diagonal

const PICKUP_SERVICE_TIME = 5 * 60 * 1000;
const DELIVERY_SERVICE_TIME = 5 * 60 * 1000;

const VEHICLES_PER_SCALE = 12;

const INTENSITY_PERIOD = 60 * 60 * 1000;

const DYNAMISM_BANDWIDTH = 0.01;
const DYNAMISM_PRECISION = 2;

const TIME_SERIES = 'time_series';

const timeSeriesType = {
  POISSON_SINE: 'POISSON_SINE',
  POISSON_HOMOGENOUS: 'POISSON_HOMOGENOUS',
  NORMAL: 'NORMAL',
  UNIFORM: 'UNIFORM'
};

export default class DatasetGenerator {
  constructor(b) {
    this.builder = b;
    this.numOrdersPerScale = ORDERS_PER_HOUR * b.scenarioLengthHours;
  }

  static builder() {
    return new Builder();
  }

  // doGenerate
  generateScenario() {
    let dataset = null;
    let jobs = new Array();

    let randomGenerator = null;
    let randomGeneratorMap = null;

    const { urgencyLevels, scaleLevels, dynamismLevels } = this.builder;
    urgencyLevels.forEach(urgency => {
      scaleLevels.forEach(scale => {
        dynamismLevels.forEach(dynamismLevel => {
          console.log(urgency, scale, dynamismLevel);

          const reps = this.builder.numInstances * dynamismLevel;
          const urg = urgency * 60 * 1000; // urgency in ms

          let officeHoursLength = this.builder.scenarioLengthMs - PICKUP_SERVICE_TIME - DELIVERY_SERVICE_TIME;
          if (urg <= 0.75 * MAXIMUM_TRAVEL_TIME) {
            officeHoursLength = officeHoursLength - (2 * MAXIMUM_TRAVEL_TIME);
          } else {
            officeHoursLength = officeHoursLength - (1.25 * MAXIMUM_TRAVEL_TIME - urg);
          }

          const numOrders = Math.round(scale * this.numOrdersPerScale);

          const props = new Map()
            .set('expected_num_orders', String(numOrders))
            .set('pickup_service_time', String(PICKUP_SERVICE_TIME))
            .set('delivery_service_time', String(DELIVERY_SERVICE_TIME))
            .set('width_height', String(AREA_WIDTH));

          // createTimeSeriesGenerator

          const settings = GeneratorSettings
            .builder()
            .setDayLength(this.builder.scenarioLengthMs)
            .setOfficeHours(officeHoursLength)
            .setTimeSeriesType()
            .setDynamismRangeCenters()
            .setUrgency()
            .setScale()
            .setNumOrders()
            .setProperties()
            .build();

        }); // dynamism
      }); // scale
    }); // urgency

    return dataset;
  }
};

class Builder {
  constructor() {
    const DYNAMISM_T1 = 0.475;
    const DYNAMISM_T2 = 0.575;
    const DYNAMISM_T3 = 0.675;

    const DEFAULT_DYN = [0.5];
    const DEFAULT_URG = [20];
    const DEFAULT_SCL = [1];
    const DEFAULT_NUM_INSTANCES = 1;
    const DEFAULT_SCENARIO_HOURS = 12;
    const DEFAULT_SCENARIO_LENGTH = DEFAULT_SCENARIO_HOURS * MS_IN_H;

    const DYNAMISM_MAP = new Map()
      .set([0.000, DYNAMISM_T1], timeSeriesType.POISSON_SINE)
      .set([DYNAMISM_T1, DYNAMISM_T2], timeSeriesType.POISSON_HOMOGENOUS)
      .set([DYNAMISM_T2, DYNAMISM_T3], timeSeriesType.NORMAL)
      .set([DYNAMISM_T3, 1.000], timeSeriesType.UNIFORM);

    this.randomSeed = 0;
    this.scaleLevels = DEFAULT_SCL;
    this.dynamismLevels = DEFAULT_DYN;
    this.dynamismRangeMap = DYNAMISM_MAP;
    this.urgencyLevels = DEFAULT_URG;
    this.numInstances = DEFAULT_NUM_INSTANCES;
    this.numThreads;
    this.datasetDir = '/';
    this.scenarioLengthHours = DEFAULT_SCENARIO_HOURS;
    this.scenarioLengthMs = DEFAULT_SCENARIO_LENGTH;
  }

  setRandomSeed(seed) {
    this.randomSeed = seed;
    return this;
  }

  setScenarioLength(hours) {
    this.scenarioLengthHours = hours;
    this.scenarioLengthMs = hours * MS_IN_H;
    return this;
  }

  setDynamismLevels(levels) {
    const rangeSet = null;
    const dynamismLevelsB = null;
    const map = null;
    
    levels.forEach(d => {
      if (d >= 0 && d <= 1) {
        const newRange = this.createDynamismRange(d);
        
      }
    });

    const timeSeriesTypes = null;

    // for (r in dynamismLevelsB) {
    //   timeSeriesTypes.put()
    // }

    this.dynamismLevels = levels;
    // this.dynamismRangeMap = null;

    return this;
  }

  // sets the levels of urgency, urgency is expressed in minutes
  setUrgencyLevels(levels) {
    this.urgencyLevels = levels;
    // this.urgencyLevels = ImmutableSet.copyOf(levels);
    return this;
  }

  setScaleLevels(levels) {
    this.scaleLevels = levels;
    // this.scaleLevels = ImmutableSet.copyOf(levels);
    return this;
  }

  // sets the number of instances that should be generated for each combination of dynamism, urgency, and scale
  setNumInstances(num) {
    this.numInstances = num;
    return this;
  }

  setNumThreads(i) {
    this.numThreads = i;
    return this;
  }

  setDatasetDir(string) {
    this.datasetDir = string;
    return this;
  }

  build() {
    return new DatasetGenerator(this);
  }

  createDynamismRange(dynamismLevel) {
    return [this.roundDynamism(dynamismLevel - DYNAMISM_BANDWIDTH), this.roundDynamism(dynamismLevel + DYNAMISM_BANDWIDTH)];
  }

  roundDynamism(dynamism) {
    const power = Math.pow(10, DYNAMISM_PRECISION);
    return Math.round(dynamism * power) / power;
  }
}