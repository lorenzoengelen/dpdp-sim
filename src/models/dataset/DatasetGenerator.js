// GENERATOR FOR D-PDPTW SCENARIOS
// - dynamism
// - urgency
// - scale
// - instances 

export default class DatasetGenerator {
  constructor(b) {
    this.builder = b;
    console.log('DatasetGenerator got constructed');
  }

  static builder() {
    console.log('instantiated .builder()');
    return new Builder();
  }
};

class Builder {
  constructor() {
    console.log('Builder got constructed');
  }

  setRandomSeed(seed) {}

  setScenarioLength(hours) {
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

  setNumThreads(i) {}

  setDatasetDir(string) {
    return this;
  }

  build() {
    return new DatasetGenerator(this);
  }
}