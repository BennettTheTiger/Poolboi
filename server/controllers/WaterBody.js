const models = require('../models');

const WaterBody = models.WaterBody;


const makeBody = (req, res) => {
  const data = req.body;
  console.dir(data);

  const bodyData = JSON.parse(data);

  const newBody = new WaterBody.WaterBodyModel(bodyData);

  const bodyPromise = newBody.save();

  bodyPromise.then(() => res.json({ success: 'IT WORKED' }));// { redirect: '/maker' }

  bodyPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists' });
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

module.exports.removeDomo = removeBody;
module.exports.getDomos = getBodies;
module.exports.makeBody = makeBody;
