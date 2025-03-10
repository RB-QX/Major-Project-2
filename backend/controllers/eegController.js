// backend/controllers/eegController.js
const axios = require('axios');
const EegData = require('../models/EegData');

exports.submitEegData = async (req, res) => {
  const { userId, eegData } = req.body;
  try {
    // Save EEG data to MongoDB (for logging/testing)
    const newData = new EegData({ userId, eegData, timestamp: new Date() });
    await newData.save();

    // Send EEG data to the AI microservice for analysis
    const aiResponse = await axios.post('http://localhost:5001/analyze-eeg', { eegData });
    const analysis = aiResponse.data;

    res.json({ message: 'EEG data processed', analysis });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAnalysis = async (req, res) => {
  // You can implement retrieval of stored analysis if needed.
  res.json({ message: 'Endpoint to get analysis data' });
};
