export default class IntensityFunctions {
  static sineIntensity() {
    return new SineIntensityBuilder();
  }
};

class SineIntensityBuilder {
  constructor() {
    const DEFAULT_AMPLITUDE = 1;
    const DEFAULT_FREQUENCY = 1;
    const DEFAULT_HEIGHT = 0;
    const DEFAULT_PHASE_SHIFT = 0.5;

    this.amplitudeSup = DEFAULT_AMPLITUDE;
    this.frequencySup = DEFAULT_FREQUENCY;
    this.heightSup = DEFAULT_HEIGHT;
    this.phaseShiftSup = DEFAULT_PHASE_SHIFT;
    this.area = null;
  }

  setPeriod(p) {
    this.frequencySup = 1 / p;
    return this;
  }

  setArea(a) {
    this.area = a;
    return this;
  }

  setHeight(h) {
    this.heightSup = h;
    return this;
  }

  setPhaseShift(s) {
    this.phaseShiftSup = s;
    return this;
  }

  buildStochasticSupplier() {
    return new SineIntensityFunctionSupplier(this);
  }
};

class SineIntensityFunctionSupplier { // implements StochasticSupplier
  constructor(b) {
    this.builder = b;
  }
};