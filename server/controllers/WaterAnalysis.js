const Sample = require('./WaterSample');
const Body = require('./WaterBody');

// - Desired water results object -
const desired = {
  ph: [7.2, 7.6],
  alkalinity: [80, 120],
  hardness: [180, 220], // ppm
  chlorine: [1, 3], // ppm
  freeChlorine: [1, 3],
  cAcid: [30, 50],
};

const test = {
  ph: 7.4,
  alkalinity: 71,
  hardness: 190,
  chlorine: 0,
  freeChlorine: 4,
  cAcid: 43,
};
// Evaluate the state of the water and offer advice
/*
    1) Get a water body ID and check the most recent sample
    2) If there no sample is found then notify and quit
    3) Check the date of the samle if its more than 3 days old factor in recent weather
    4) Check how far its levels deviate from desired water
    5) Create a water treatment plan and return this data
*/

const evaluate = (req, res) => {
  console.dir(desired);
  for (const key of Object.keys(desired)) {
    console.log(key, test[key]);
  }
};

// looks at how far off the actual value is from the desired value
const analyiseField = (desired, actual) => {

};


module.exports.evaluate = evaluate;
