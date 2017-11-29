// GENERATOR FOR D-PDPTW SCENARIOS
// - dynamism
// - urgency
// - scale
// - instances

const THREAD_SLEEP_DURATION = 100;
const MS_IN_MIN = 60000;
const MS_IN_H = 60 * MS_IN_MIN;
const TICK_SIZE = 1000;
const VEHICLE_SPEED_KMH = 50; 

export default class DatasetGenerator {
  constructor(b) {
    console.log('DatasetGenerator got constructed');
    this.builder = b;
  }

  static builder() {
    console.log('instantiated .builder()');
    return new Builder();
  }
};

class Builder {
  constructor() {
    console.log('Builder got constructed');
    
    const DYNAMISM_T1 = 0.475;
    const DYNAMISM_T2 = 0.575;
    const DYNAMISM_T3 = 0.675;

    const DEFAULT_DYN = 0.5;
    const DEFAULT_URG = 20;
    const DEFAULT_SCL = 1;
    const DEFAULT_NUM_INSTANCES = 1;
    const DEFAULT_SCENARIO_HOURS = 4;
    const DEFAULT_SCENARIO_LENGTH = DEFAULT_SCENARIO_HOURS * MS_IN_H;

    const DYNAMISM_MAP = null;

    this.randomSeed;
    this.scaleLevels;
    this.dynamismLevels;
    this.dynamismRangeMap;
    this.urgencyLevels;
    this.numInstances;
    this.numThreads;
    this.datasetDir;
    this.scenarioLengthHours;
    this.scenarioLengthMs;
  }

  setRandomSeed(seed) {}

  setScenarioLength(hours) {
    this.scenarioLengthHours = hours;
    this.scenarioLengthMs = hours * MS_IN_H;
    return this;
  }

  setDynamismLevels(levels) {
    return this;
  }

  setUrgencyLevels(levels) {
    return this;
  }

  setScaleLevels(levels) {
    return this;
  }

  setNumInstances(num) {
    return this;
  }

  setNumThreads(i) {
    return this;
  }

  setDatasetDir(string) {
    return this;
  }

  build() {
    return new DatasetGenerator(this);
  }
}