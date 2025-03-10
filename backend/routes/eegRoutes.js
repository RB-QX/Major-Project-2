// backend/routes/eegRoutes.js
const express = require('express');
const router = express.Router();
const { submitEegData, getAnalysis } = require('../controllers/eegController');

router.post('/submit', submitEegData);
router.get('/analysis/:userId', getAnalysis);

module.exports = router;
