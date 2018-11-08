// Data Model for a water sample

const mongoose = require('mongoose');


const WaterSampleSchema = new mongoose.Schema({
  waterBody: {

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

module.exports.WaterSampleSchema = WaterSampleSchema;
