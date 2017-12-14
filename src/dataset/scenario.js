export class LocationGenerator {
  constructor(b) {
    this.builder = b;
  }

  static builder() {
    return new Builder();
  }
};

class Builder {
  constructor() {
    this.xMin = null;
    this.yMin = null;
    this.xMax = null;
    this.yMax = null;
  }

  xMinimum(x) {
    this.xMin = x;
    return this;
  }

  yMinimum(y) {
    this.yMin = y;
    return this;
  }

  min(min) {
    return this.xMinimum(min).yMinimum(min);
  }

  xMaximum(x) {
    this.xMax = x;
    return this;
  }

  yMaximum(y) {
    this.yMax = y;
    return this;
  }

  max(max) {
    return this.xMaximum(max).yMaximum(max);
  }

  // create a uniform distributed LocationGenerator
  // in case boundaries are set, any specified means and standard deviations are ignored when generating locations
  // return a uniform distributed generator
  buildUniform() {
    return new LocationGenerator(this);
  }
};