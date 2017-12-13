export default class GeneratorSettings {
  constructor(b) {

  }

  static builder() {
    return new Builder();
  }
};

class Builder {
  build() {
    return new GeneratorSettings(this);
  }

  setDayLength(length) {
    console.log('T', length)
    return this;
  }

  setOfficeHours(hours) {
    console.log('O', hours);
    return this;
  }

  setTimeSeriesType(type) {
    return this;
  }

  setDynamismRangeCenters(map) {
    return this;
  }

  setUrgency(urgency) {
    return this;
  }

  setScale(scale) {
    return this;
  }

  setNumOrders(numOrders) {
    return this;
  }

  setProperties(props) {
    return this;
  }
};