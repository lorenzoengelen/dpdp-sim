export default class MDP {
  constructor(init, actionList, terminals, gamma = 0.9) {
    console.log('MDP instantiated');
    this.init = init;
    this.actionList = actionList;
    this.terminals = terminals;
    this.gamma = gamma;
    this.states = [];
    this.contribution = {};
  }

  C(state) {

  }

  actions(state) {

  }
};