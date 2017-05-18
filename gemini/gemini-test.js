/* global gemini */

import { atoms, molecules, organisms } from '../gemini-config.json';

// Alerts
// gemini.suite('alert', (suite)=> {
//   suite.setUrl('/alerts/index.html')
//     .setCaptureElements('page-wrapper')
//     .capture('plain');
// });


// Generate all atoms elements
Object.keys(atoms).map((key) => {
  return gemini.suite(key, (suite) => {
    suite.setUrl('/atoms/index.html')
      .setCaptureElements(atoms[key].name)
      .capture('plain');
  });
});

// Generate all molecules elements
Object.keys(molecules).map((key) => {
  return gemini.suite(key, (suite) => {
    suite.setUrl('/molecules/index.html')
      .setCaptureElements(molecules[key].name)
      .capture('plain');
  });
});

// Generate all organisms elements
Object.keys(organisms).map((key) => {
  return gemini.suite(key, (suite) => {
    suite.setUrl('/organisms/index.html')
      .setCaptureElements(organisms[key].name)
      .capture('plain');
  });
});
