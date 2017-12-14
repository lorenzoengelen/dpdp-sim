export default class GeneratorSettings {
  constructor(b) {
    this.builder = b;
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
    this.dayLength = length;
    return this;
  }

  setOfficeHours(hours) {
    this.officeHours = hours;
    return this;
  }

  setTimeSeriesType(type) {
    this.timeSeriesType = type;
    return this;
  }

  setDynamismRange(range) {
    this.dynamismRange = range;
    return this;
  }

  setDynamismRangeCenters(rangeCenter) {
    this.dynamismRangeCenters = rangeCenter;
    return this;
  }

  setUrgency(urgency) {
    this.urgency = urgency;
    return this;
  }

  setScale(scale) {
    this.scale = scale;
    return this;
  }

  setNumOrders(numOrders) {
    this.numOrders = numOrders;
    return this;
  }

  setProperties(props) {
    this.properties = props;
    return this;
  }
};