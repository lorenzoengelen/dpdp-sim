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

// MDP PART
for (let i = 0; i < 1; i++) {
  // iterate over SAMPLE PATHS
  const sample = require(`./lon/0.80-20-1.00-${i}.scen`);
  console.log(`SAMPLE PATH: ./lon/0.80-20-1.00-${i}.scen`);


  // iterate over SAMPLE REALIZATIONS
  for (let j = 0, len = sample.events.length; j < len; j++) {
    const realization = sample.events[j];
    if (realization.class === 'com.github.rinde.rinsim.pdptw.common.AutoValue_AddParcelEvent') {
      console.log(j);
    }
  } // endfor j
} // endfor i















