// Data Model for a water sample

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let WaterSampleModel = {};
const convertId = mongoose.Types.ObjectId;

const WaterSampleSchema = new mongoose.Schema({
  waterBody: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'WaterBody',
  },
  accountId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  hardness: {
    type: Number,
    min: 0,
    max: 1000,
    required: true,
  },
  chlorine: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
  freeChlorine: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
  ph: {
    type: Number,
    min: 6.2,
    max: 8.4,
    required: true,
  },
  alkalinity: {
    type: Number,
    min: 0,
    max: 240,
    required: true,
  },
  cAcid: {
    type: Number,
    min: 0,
    max: 300,
    required: true,
  },
  notes: {
    type: String,
    trim: true,
    maxlength: 10000,
  },
});

WaterSampleSchema.statics.findByBody = (bodyId, callback) =>
  // console.log(`looking for water with owner id ${bodyId}`);
   WaterSampleModel.find({ waterBody: bodyId }).sort({ date: -1 }).exec(callback);

WaterSampleSchema.statics.findRecent = (bodyId, callback) =>
  // console.log(`looking for water with owner id ${bodyId}`);
   WaterSampleModel.findOne({ waterBody: bodyId }).sort({ date: -1 }).exec(callback);

// Delete a water sample by its id
WaterSampleSchema.statics.removeSample = (sampleId, callback) => {
  const id = {
    _id: convertId(sampleId),
  };

  return WaterSampleModel.deleteOne(id).exec(callback);
};


WaterSampleModel = mongoose.model('WaterSample', WaterSampleSchema);
module.exports.WaterSampleModel = WaterSampleModel;
module.exports.WaterSampleSchema = WaterSampleSchema;
