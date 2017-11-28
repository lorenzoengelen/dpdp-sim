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

  static builder(name) {
    console.log('hello' + name);
  }
};