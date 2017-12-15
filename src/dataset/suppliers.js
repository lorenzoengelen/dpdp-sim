export default class StochasticSuppliers {
  static uniformDouble(lower, upper) {
    return new DoubleDistributionSS(new UniformRealDistribution(Math.random(), lower, upper));
  }
};

class DoubleDistributionSS {
  // todo
};

// creates a uniform distribution
class UniformRealDistribution {
  // todo
};

