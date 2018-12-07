const models = require('../models');

const WaterBody = models.WaterBody;


const makeBody = (req, res) => {
  const data = req.body;

  console.dir(data);
  const dataStaging = {
    owner: data.owner,
    gallons: data.gallons,
    surfaceArea: data.area,
    zipCode: data.zip,
    isPool: data.isPool,
    inSun: data.inSun,
    name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
    notes: data.notes,
  };
  const newBody = new WaterBody.WaterBodyModel(dataStaging);

  const bodyPromise = newBody.save();

  bodyPromise.then(() => res.json({ redirect: '/dashboard' }));

  bodyPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Water Body already exists' });
    }

    return res.status(400).json({ error: 'Oppz something is broken lol' });
  });

  return bodyPromise;
};

const getBodies = (request, response) => {
  const req = request;
  const res = response;

  return WaterBody.WaterBodyModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occoured' });
    }
    return res.json({ bodies: docs });
  });
};

const removeBody = (request, response) => {
  const req = request;
  const res = response;
  // req.body has domo payload that was passed in
  console.dir(`attempting to delete ${req.body.name} with id of ${req.body.id}`);

  return WaterBody.WaterBodyModel.removeBody(req.body.id, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occoured' });
    }

    return res.status(200).json({ Success: 'Deleted Body' });
  });
};
// finds the most recent sample based on a water body id
const findRecent = (req, res) => WaterBody.WaterBodyModel.findRecent(req.body.id, (err) => {
  if (err) {
    console.log(err);
    return res.status(400);
  }
  return res.status(200).json({ recentSample: 'test' });
});

module.exports.removeBody = removeBody;
module.exports.getBodies = getBodies;
module.exports.makeBody = makeBody;
module.exports.findRecent = findRecent;
