const Sample = require('./WaterSample');

// - Desired water results object with min and max -
const desired = {
  ph: [7.2, 7.6],
  alkalinity: [80, 120],
  hardness: [180, 220], // ppm
  chlorine: [1, 3], // ppm
  freeChlorine: [1, 3],
  cAcid: [30, 50],
};
// globals
let notes = '';
let health = 'Good';
let score = 100;
// Evaluate the state of the water and offer advice
const check = (sample, res) => {
  notes = '';
  score = 100;
  const lastSample = sample.pop();
  Object.keys(desired).map((key) => {
    if (lastSample[key] < desired[key][0]) {
      notes += (` Low ${key} `);
      score -= 5;
    }
    if (lastSample[key] > desired[key][1]) {
      notes += (` High ${key} `);
      score -= 5;
    }
  });
  // make a tip msg
  if (score >= 55) health = 'Yikes looks like you need to add some chemicals!';
  if (score >= 75) health = 'A few tweaks and you can get that water back to good health!';
  if (score >= 95) health = 'Water is in good condition!';
  return res.status(200).json({ health, notes, score });
};
// query out the last water sample for a water body
const evaluate = (req, res) => {
  Sample.findRecent(req.query.bodyID, (data) => {
    if (data.length === 0) return res.status(200);
    check(data, res);
  });
};

// looks at how far off the actual value is from the desired value
module.exports.evaluate = evaluate;
