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

const getSamples = (request, response) => {
  const req = request;
  const res = response;

  return WaterSample.WaterSampleModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occoured' });
    }
    return res.json({ bodies: docs });
  });
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
