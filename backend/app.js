// backend/app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');  // for WebSocket integration

const userRoutes = require('./routes/userRoutes');
const eegRoutes = require('./routes/eegRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Register API routes
app.use('/api/users', userRoutes);
app.use('/api/eeg', eegRoutes);

// Set up HTTP server and basic WebSocket using "ws" package
const server = http.createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });

// When a client connects, set up message handlers.
wss.on('connection', (ws) => {
  console.log('Client connected via WebSocket');

  // For this prototype, we can simulate sending adaptive UI updates.
  ws.on('message', (message) => {
    console.log('Received:', message);
  });

  // Optionally, periodically send a dummy adaptation message.
  setInterval(() => {
    // For example, if simulated EEG analysis indicates high load:
    const update = JSON.stringify({
      type: "UI_UPDATE",
      changes: { cognitiveLoad: "High", message: "Simplifying interface due to high cognitive load." }
    });
    ws.send(update);
  }, 15000);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
