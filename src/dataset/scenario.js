export class LocationGenerator {
  constructor(b) {
    this.builder = b;
  }

  static builder() {
    return new LocationBuilder();
  }
};

class LocationBuilder {
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

export class TimeSeriesGenerator {
  constructor(b) {
    this.builder = b;
  }

  static builder() {
    return new TimeSeriesGeneratorBuilder();
  }

  generate() {

  }
};

class TimeSeriesGeneratorBuilder {
  build() {
    return new TimeSeriesGenerator(this);
  }
};

export class TimeSeries {
  static nonHomogenousPoisson(length, intensityFunction) {
    return new SuppliedNonHomogenous(length, intensityFunction);
  }

  static homogenousPoisson(length, numEvents) {
    return new PoissonProcess(length, numEvents / length);
  }
};

class SuppliedNonHomogenous {
  constructor(l, funcSup) {
    this.length = l;
    this.lambdSup = funcSup;
    this.rng = null;
  }

  generate(seed) {

  }
}

class PoissonProcess { // implements TimeSeriesGenerator
  constructor(len, intens) {
    this.length = len;
    this.intensity = intens;
    this.rng = null;
  }

  generate(seed) {
    
  }
}