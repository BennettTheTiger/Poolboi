// Data Model for a body of water such as pool or spa

const mongoose = require('mongoose');


const WaterBodySchema = new mongoose.Schema({
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
  notes: {
    type: String,
    max: 100000,
    trim: true,
  },


});

module.exports.WaterBodySchema = WaterBodySchema;
