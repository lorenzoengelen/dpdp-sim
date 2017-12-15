export default class StochasticSuppliers {
  static uniformDouble(lower, upper) {
    return new DoubleDistributionSS(new UniformRealDistribution(Math.random(), lower, upper));
  }

  // construct StochasticSupplier that produce normal (Gaussian) distributed numbers
  static normal() {
    return new Builder();
  }
};

class DoubleDistributionSS {
  // todo
};

// creates a uniform distribution
class UniformRealDistribution {
  // todo
};

const OutOfBoundStrategy = {
  ROUND: 'ROUND',
  REDRAW: 'REDRAW'
};

class Builder {
  constructor() {
    this.SMALLEST_DOUBLE = 0.000000000000001;
    this.MAX_ITERATIONS = 1000 //1000000;
    this.STEP_SIZE_DENOMINATOR = 1.5;

    this.mean = 0;
    this.std = 1;
    this.lowerBound = -Infinity;
    this.upperBound = Infinity;
    this.outOfBoundStrategy = OutOfBoundStrategy.REDRAW;
  }

  setMean(m) {
    this.mean = m;
    return this;
  }

  setStd(sd) {
    this.std = sd;
    return this;
  }

  setLowerBound(lower) {
    this.lowerBound = lower;
    return this;
  }

  redrawWhenOutOfBounds() {
    this.outOfBoundStrategy = OutOfBoundStrategy.REDRAW;
    return this;
  }

  // scale the normal distribution such that the effective mean is as given by mean(double) in case a lower bound was set
  scaleMean() {
    if (this.lowerBound !== -Infinity && this.outOfBoundStrategy === OutOfBoundStrategy.REDRAW) {

      let stepSize = 1;
      let curMean = this.mean;
      let dir = 0;
      let effectiveMean;
      let iterations = 0;

      do {
        effectiveMean = this.computeEffectiveMean(curMean, this.std, this.lowerBound);
        // save direction
        const oldDir = dir;
        if (effectiveMean > this.mean) {
          dir = 1;
        } else {
          dir -1;
        }
        // if direction changed; change step size
        if (dir !== oldDir && oldDir !== 0) {
          stepSize /= this.STEP_SIZE_DENOMINATOR;
        }
        // apply step
        if (effectiveMean > this.mean) {
          curMean -= stepSize;
        } else {
          curMean += stepSize;
        }
        iterations++;
      } while (Math.abs(effectiveMean - this.mean) > this.SMALLEST_DOUBLE);
      this.mean = curMean;
    }
    return this;
  }

  computeEffectiveMean(m, s, lb) {
    const normal = new NormalDistribution();
    console.log('normal', normal)
    const alpha = (lb - m) / s;
    const pdf = normal.density(alpha);
    const cdf = normal.cumulativeProbability(alpha);
    const lambda = pdf / (1 - cdf);
    return m + s * lambda;
  }
}

class NormalDistribution {
  // create a normal distribution with mean equal to zero and standard deviation equal to one
  constructor(m, sd) {
    this.mean = m || 0;
    this.variance = Math.pow(sd, 2) || 1;
    this.std = sd || 1;
  }

  // returns the probability density function (PDF) of this distribution evaluated at the specified point x
  density(x) {
    const m = this.std * Math.sqrt(2 * Math.PI);
    const e = Math.exp(-Math.pow(x - this.mean, 2) / (2 * this.variance));
    return e / m;
  }

  // for a random variable X whose values are distributed according to this distribution, this method returns P(X <= x)
  cumulativeProbability(x) {
    return 0.5 * this.erfc(-(x - this.mean) / (this.std * Math.sqrt(2)));
  }

  erfc(x) {
    const z = Math.abs(x);
    const t = 1 / (1 + z / 2);
    const r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 +
            t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 +
            t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 +
            t * (-0.82215223 + t * 0.17087277)))))))));
    return x >= 0 ? r : 2 - r;
  }
}