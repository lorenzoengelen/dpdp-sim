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
    // iterate over SAMPLES
    for (let h = 0; h < 1/*this.samples.H*/; h++) {
      // set SAMPLE PATH
      const {K, path} = this.samples.paths[h];
      
      let decisionState = null;

      // let clonedState = cloneState(this.initialState);

      let clonedState = State.clone(this.initialState); 

      // iterate over REALIZATIONS
      for (let k = 0; k < K; k++) {
        // set REALIZATION
        const realization = path[k];
        // console.log(realization)

        // DECISION STATE
        // create a new state
        let decisionState = State.init();

        // POST-DECISION STATE - the policy maps the DECISION STATE to a POST-DECISION STATE
        // return a new state
        let postDecisionState = this.policyFunction(decisionState);

      } // endfor K (sample paths)
    }// endfor H (realizations)

  } // end SAA approximation
} // endClass PFA