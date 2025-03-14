// src/pages/Dashboard.js
import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { UserStateContext } from '../context/UserStateContext';
import EEGDisplay from '../components/EEGDisplay';

function Dashboard() {
  const { userState, setUserState } = useContext(UserStateContext);

  useEffect(() => {
    // Establish a WebSocket connection for real-time updates from the backend.
    const ws = new WebSocket('ws://localhost:5000/ws'); // Make sure the URL matches your backend setup.
    
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'UI_UPDATE') {
        setUserState(prev => ({
          ...prev,
          cognitiveLoad: message.changes.cognitiveLoad || prev.cognitiveLoad,
          adaptationMessage: message.changes.message || '',
        }));
      }
    };

    // Simulate sending EEG data every 5 seconds.
    const interval = setInterval(() => {
      // Generate dummy EEG data.
      const simulatedEegData = [Math.random(), Math.random(), Math.random()];
      axios.post('http://localhost:5000/api/eeg/submit', {
        userId: "dummyUserId",  // Replace with actual user ID after implementing authentication.
        eegData: simulatedEegData,
      })
      .then(response => {
        console.log('EEG Analysis:', response.data.analysis);
      })
      .catch(error => console.error('Error sending EEG data:', error));
    }, 5000);

    return () => {
      clearInterval(interval);
      ws.close();
    };
  }, [setUserState]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Cognitive Load: {userState.cognitiveLoad}</p>
      {userState.adaptationMessage && <p>{userState.adaptationMessage}</p>}
      <EEGDisplay />
    </div>
  );
}

export default Dashboard;
