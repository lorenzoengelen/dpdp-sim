import State from './state';

export default class PFA {
  constructor() {
    this.initialState = null; 
    this.policyFunction = null;
    this.samples = null;

    this.decisionStates = new Array();
    this.postDecisionStates = new Array();
  }

  static init() {
    return new PFA();
  }

  setInitialState(state) {
    this.initialState = state;
    return this;
  }

  setPolicyFunction(func) {
    this.policyFunction = func;
    return this;
  }

  setSamples(samples) {
    this.samples = samples;
    return this;
  }

  // SAMPLE AVERAGE APPROXIMATION (SAA) (Fu, 2015)
  approximate() {
    // iterate over SAMPLE PATHS
    for (let h = 0, lnh = this.samples.length; h < 1; h++) { // <== NOTE HARDCODED 1 LOOP (lnh) ==>
      // set REALIZATIONS
      const sample = this.samples[h];
      
      // set INITIAL STATE
      const initialState = new State(this.init.k, this.init.tk, this.init.c, this.init.C, this.init.R); 
      const states = [initialState];

      // iterate over REALIZATIONS
      for (let k = 0, lnk = sample.length; k < 1; k++) { // <== NOTE HARDCODED 10 LOOP (lnk) ==>
        const realization = sample[k], r = sample[k];

        // PRE-DECISION STATE
        const {C, R} = states[states.length - 1];
        // enter a new DECISION STATE due to new request for service
        const decisionState = new State(r.k, r.a, r, C, R);

        // the policy maps the DECISION STATE to a POST-DECISION STATE
        const postDecisionState = this.policy(decisionState);

      } // endfor k (realizations)
    } // endfor h (sample paths)

  } // end approximate
} // end class PFA