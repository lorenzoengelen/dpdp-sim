import State from './state';

export default class PFA {
  constructor(init, policy, samples) {
    this.init = init;                   // initial state
    this.policy = policy;               // policy
    this.samples = samples;             // sample path realizations

  }

  approximate() {
    // iterate over SAMPLE PATHS
    for (let h = 0, lnh = this.samples.length; h < 1; h++) { // <== NOTE HARDCODED 1 LOOP ==>
      // set REALIZATIONS
      const sample = this.samples[h];
      
      // set INITIAL STATE
      const initialState = new State(this.init.k, this.init.tk); 
      const states = [initialState];

      // iterate over REALIZATIONS
      for (let k = 0, lnk = sample.length; k < lnk; k++) {
        const realization = sample[k], r = sample[k];

        // PRE-DECISION STATE
        const {C, R} = states[states.length - 1];
        // enter a new DECISION STATE due to new request for service
        const decisionState = new State(r.k, r.a, r, C, R);
        console.log(decisionState);

        // the policy maps the DECISION STATE to a POST-DECISION STATE
        const postDecisionState = this.policy(decisionState);

      } // endfor k (realizations)
    } // endfor h (sample paths)

  } // end approximate
} // end class PFA