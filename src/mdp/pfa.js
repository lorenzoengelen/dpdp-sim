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

  approximate() {
    const { paths } = this.samples;
    
    let { H } = this.samples; // ONLY FOR TEST PURPOSES => CHANGE TO CONST LATER
    // H = 2 // ==> NOTE ONLY FOR TEST PURPOSES <==

    // SAMPLE AVERAGE APPROXIMATION (SAA) (Fu, 2015)
    let averageAcceptedCustomers = 0;
    let averageRejectedCustomers = 0;
    let averageRoutePlanServiceTime = 0;
    let averageRoutePlanWaitingTime = 0;
    let averageRoutePlanTravelTime = 0;
    let averageRoutePlanExecutionTime = 0;
    let averageRoutePlanCost = 0;

    // iterate over SAMPLES
    for (let h = 0; h < H; h++) {
      
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
      } // endfor K (sample paths)

      // compute new SAMPLE AVERAGES
      const lastState = postDecisionStates[K];
      averageAcceptedCustomers = averageAcceptedCustomers + (1 / H) * lastState.getAcceptedCustomers();
      averageRejectedCustomers = averageRejectedCustomers + (1 / H) * lastState.getRejectedCustomers();
      averageRoutePlanServiceTime = averageRoutePlanServiceTime + (1 / H) * lastState.getRoutePlanServiceTime();
      averageRoutePlanWaitingTime = averageRoutePlanWaitingTime + (1 / H) * lastState.getRoutePlanWaitingTime();
      averageRoutePlanTravelTime = averageRoutePlanTravelTime + (1 / H) * lastState.getRoutePlanTravelTime();
      averageRoutePlanExecutionTime = averageRoutePlanExecutionTime + (1 / H) * lastState.getRoutePlanExecutionTime();
      averageRoutePlanCost = averageRoutePlanCost + (1 / H) * lastState.getRoutePlanCost();

      console.log(`LAST STATE OF SAMPLE PATH: ${h + 1}`, postDecisionStates[K],
        postDecisionStates[postDecisionStates.length - 1].getRoutePlanCost() / 1000 / 60 / 60,
        postDecisionStates[postDecisionStates.length - 1].getAcceptedCustomers(),
        postDecisionStates[postDecisionStates.length - 1].getRejectedCustomers())

    }// endfor H (realizations)
    console.log('==> AVERAGE ACCEPTED', averageAcceptedCustomers);
    console.log('==> AVERAGE REJECTED', averageRejectedCustomers);
    console.log('==> AVERAGE SERVICE TIME', averageRoutePlanServiceTime / 1000 / 3600);
    console.log('==> AVERAGE WAITING TIME', averageRoutePlanWaitingTime / 1000 / 3600);
    console.log('==> AVERAGE TRAVEL TIME', averageRoutePlanTravelTime / 1000 / 3600);
    console.log('==> AVERAGE EXECUTION TIME', averageRoutePlanExecutionTime / 1000 / 3600);
    console.log('==> AVERAGE ROUTE PLAN COST', averageRoutePlanCost / 1000 / 3600);

  } // end approximate
} // endClass PFA