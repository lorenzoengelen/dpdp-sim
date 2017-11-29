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
import DatasetGenerator from './dataset/DatasetGenerator';

window.avi = (i) => {
  var i = i || 0;
  console.log(`this is number ${i}`);
  if (i < 10) {
    setTimeout(() => {
      window.avi(++i);
    }, 1000);
  }
};

const dg = DatasetGenerator
  .builder()
  .setScenarioLength(4)
  .setDynamismLevels([0.5])
  .setUrgencyLevels([20])
  .setScaleLevels([1])
  .setNumInstances(1)
  .setDatasetDir()
  .setNumThreads()
  .build();

// MDP PART
import MDP from './mdp/mdp';
const mdp = new MDP();