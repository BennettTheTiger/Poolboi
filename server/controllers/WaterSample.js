const models = require('../models');

const WaterSample = models.WaterSample;


const makeSample = (req, res) => {
  const data = req.body;
  const account = req.session.account._id;

  const dataStaging = {
    waterBody: data.body,
    accountId: account,
    hardness: data.hardness,
    chlorine: data.chlorine,
    freeChlorine: data.freeChlorine,
    ph: data.ph,
    alkalinity: data.alkalinity,
    cAcid: data.cAcid,
    notes: data.notes,
  };
  const newSample = new WaterSample.WaterSampleModel(dataStaging);

  const samplePromise = newSample.save();

  samplePromise.then(() => res.json({ redirect: '/dashboard' }));

  samplePromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Sample already exists' });
    }

    return res.status(400).json({ error: 'Oppz something is broken lol' });
  });

  return samplePromise;
};

// request water samples from a water body id
const getSamples = (req, res) => {
  console.dir(req.query);
  models.WaterSample.WaterSampleModel.findByBody(req.query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ err });
    }
    console.log(results);
    res.status(200).json(results);
  });// end of find samples
};


const removeSample = (request, response) => {
  const req = request;
  const res = response;
  // req.body has domo payload that was passed in
  console.dir(`attempting to delete ${req.body.name} with id of ${req.body.id}`);

  return WaterSample.WaterSampleModel.removeBody(req.body.id, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occoured' });
    }

    return res.status(200).json({ Success: 'Deleted Body' });
  });
};

module.exports.removeSample = removeSample;
module.exports.getSamples = getSamples;
module.exports.makeSample = makeSample;
