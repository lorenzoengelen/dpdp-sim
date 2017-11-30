// HTML PART
import React from 'react';
import ReactDOM from 'react-dom';

const tick = () => {
  const element = (
    <div>
      <h1>Dynamic PDP Simulator</h1>
      <h4>press "ctrl + cmd + j" to open up dev console</h4>
      <p>there is no status to show at time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
};

setInterval(tick, 1000);

// DATASET PART
// import DatasetGenerator from './dataset/generator';

// const dg = DatasetGenerator
//   .builder()
//   .setScenarioLength(4)
//   .setDynamismLevels([0.5])
//   .setUrgencyLevels([20])
//   .setScaleLevels([1])
//   .setNumInstances(1)
//   .setDatasetDir()
//   .setNumThreads()
//   .build();

// POLICY FUNCTION APPROXIMATION
import PFA from './mdp/pfa';
import State from './mdp/state';
import policy from './mdp/policy';

const ab = s => { return { a: Number(s.split(',')[0]), b: Number(s.split(',')[1]) }; };

// step 0: initialization
// step 0a: create SAMPLE PATHS
const samples = [];

for (let i = 0; i < 5; i++) {
  // iterate over SAMPLE PATHS
  const sample = require(`./lon/0.80-20-1.00-${i}.scen`);
  console.log(`SAMPLE PATH: ./lon/0.80-20-1.00-${i}.scen`);

  const realizations = [];

  let k = 0; // decision point k
  // iterate over SAMPLE REALIZATIONS
  for (let j = 0, len = sample.events.length; j < len; j++) {
    const realization = sample.events[j], e = sample.events[j];
    if (realization.class === 'com.github.rinde.rinsim.pdptw.common.AutoValue_AddParcelEvent') {

      ++k;
      const a = e.value.time; // announce time

      const pxy = ab(e.value.parcelDTO[0]), px = pxy.a, py = pxy.b; // pickup location (px, py)
      const p_tw = ab(e.value.parcelDTO[2]), pe = p_tw.a, pl = p_tw.b; // pickup time window (pe, pl)
      const ps = e.value.parcelDTO[6]; // pickpup service time (ps)

      const dxy = ab(e.value.parcelDTO[1]), dx = dxy.a, dy = dxy.b; // delivery location (dx, dy)
      const d_tw = ab(e.value.parcelDTO[3]), de = d_tw.a, dl = d_tw.b; // delivery time window (de, dl)
      const ds = e.value.parcelDTO[7]; // delivery service time (ds)
      
      realizations.push({k, a, px, py, dx, dy, pe, pl, de, dl, ps, ds, alpha: null});
    }
  } // endfor k (set realizations K)
  samples.push(realizations);
} // endfor h (set sample paths H)

const init = State.init()
  .addVehicle(2.5, 2.5)
  .addVehicle(2.5, 2.5)
  .addVehicle(2.5, 7.5)
  .addVehicle(2.5, 7.5)
  .addVehicle(7.5, 2.5)
  .addVehicle(7.5, 2.5)
  .addVehicle(7.5, 7.5)
  .addVehicle(7.5, 7.5);

const pfa = new PFA(init, policy, samples)
  .approximate();











