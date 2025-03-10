// backend/models/EegData.js
const mongoose = require('mongoose');

const eegDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  eegData: { type: Array, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('EegData', eegDataSchema);
