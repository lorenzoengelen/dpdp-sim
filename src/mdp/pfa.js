import State from './state';
import {cloneState} from '../utils/utils';

export default class PFA {
  constructor() {
    this.initialState = null; 
    this.policyFunction = null;
    this.samples = null;

    //
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
    const {H, paths} = this.samples;
    // iterate over SAMPLES
    for (let h = 0; h < 2/*H*/; h++) {
      
      // set SAMPLE PATH
      const {K, path} = paths[h];
      
      // set INITIAL STATE
      const initialState = State.clone(this.initialState);
      const decisionStates = new Array();
      const postDecisionStates = new Array(initialState);

      // iterate over REALIZATIONS
      for (let k = 0; k < K; k++) {
        // set REALIZATION
        const realization = path[k];
        const {announceTime} = realization;

        // DECISION STATE
        // create a new state - map last post-decision state to new decision state
        const decisionState = State.clone(postDecisionStates[postDecisionStates.length - 1])
          .setDecisionPoint(k + 1)
          .setDecisionTime(announceTime)
          .setNewCustomer(realization);
        decisionStates.push(decisionState);

        // POST-DECISION STATE - the policy maps the DECISION STATE to a POST-DECISION STATE
        // return a new state
        const postDecisionState = this.policyFunction(decisionState);
        postDecisionStates.push(postDecisionState);
        
        console.log('decisionState', decisionState)
        console.log('postDecisionState', postDecisionState)

      } // endfor K (sample paths)
    }// endfor H (realizations)

  } // end SAA approximation
} // endClass PFA