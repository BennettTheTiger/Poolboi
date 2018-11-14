// Data Model for a body of water such as pool or spa

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let WaterBodyModel = {};
const convertId = mongoose.Types.ObjectId;

const WaterBodySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  gallons: {
    type: Number,
    min: 1,
    max: 200000,
    required: true,
  },
  surfaceArea: {
    type: Number,
    min: 0,
    max: 500000,
    required: true,
  },
  zipCode: {
    type: Number,
    min: 0,
    max: 99999,
    required: true,
  },
  isPool: {
    type: Boolean,
    default: true, // assume its a pool
    required: true,
  },
  inSun: {
    type: Boolean,
    default: true, // assume its in the sun
  },
  name: {
    type: String,
    max: 100000,
    trim: true,
    required: true,
  },
  notes: {
    type: String,
    max: 100000,
    trim: true,
  },
});

WaterBodySchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return WaterBodyModel.find(search).select('name age felonies').exec(callback);
};

// Delete a Domo by its id
WaterBodySchema.statics.removeBody = (domoId, callback) => {
  const id = {
    _id: convertId(domoId),
  };
  return WaterBodyModel.deleteOne(id).exec(callback);
};


WaterBodyModel = mongoose.model('WaterBody', WaterBodySchema);

module.exports.WaterBodyModel = WaterBodyModel;
module.exports.WaterBodySchema = WaterBodySchema;
