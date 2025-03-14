import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [patientData, setPatientData] = useState({
    name: 'John Doe',
    age: 42,
    patientId: 'P-2023-0042',
    diagnosis: 'Under evaluation',
    stressLevel: 'Moderate',
    lastRecording: '2025-03-12T14:30:00'
  })

  const [eegData, setEegData] = useState(null)
  const [sessionActive, setSessionActive] = useState(false)

  // Simulate fetching EEG data
  useEffect(() => {
    if (sessionActive) {
      const interval = setInterval(() => {
        // Generate random data to simulate real-time updates
        const newData = {
          timestamp: new Date().toISOString(),
          channels: {
            alpha: Math.random() * 10,
            beta: Math.random() * 15,
            delta: Math.random() * 8,
            theta: Math.random() * 12,
            gamma: Math.random() * 5
          }
        }
        setEegData(newData)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [sessionActive])

  // Handle starting/stopping EEG recording session
  const toggleSession = () => {
    setSessionActive(!sessionActive)
  }

  return (
    <div className="dashboard">
      <header className="header">
        <h1>NeuroAdapt Dashboard</h1>
        <div className="user-controls">
          <button>Settings</button>
          <button>Help</button>
          <button>Profile</button>
        </div>
      </header>

      <main className="main-content">
        <aside className="sidebar">
          <div className="patient-info">
            <h2>Patient Information</h2>
            <p><strong>Name:</strong> {patientData.name}</p>
            <p><strong>Age:</strong> {patientData.age}</p>
            <p><strong>ID:</strong> {patientData.patientId}</p>
            <p><strong>Diagnosis:</strong> {patientData.diagnosis}</p>
            <p><strong>Stress Level:</strong> {patientData.stressLevel}</p>
            <p><strong>Last Recording:</strong> {new Date(patientData.lastRecording).toLocaleString()}</p>
          </div>
          
          <div className="actions">
            <button 
              className={sessionActive ? "stop-btn" : "start-btn"}
              onClick={toggleSession}
            >
              {sessionActive ? "Stop Recording" : "Start Recording"}
            </button>
            <button className="analysis-btn">Run Analysis</button>
            <button className="report-btn">Generate Report</button>
          </div>
        </aside>

        <section className="visualization-area">
          <div className="eeg-monitor">
            <h2>EEG Live Monitor</h2>
            <div className="chart-container">
              {/* Vue Custom Element usage in React */}
              <vue-eeg-chart 
                active={sessionActive} 
                data={eegData ? JSON.stringify(eegData) : ''}
              ></vue-eeg-chart>
            </div>
          </div>
          
          <div className="metrics">
            <div className="metric-card">
              <h3>Alpha Waves</h3>
              <p className="metric-value">{eegData ? eegData.channels.alpha.toFixed(2) : '-'} μV</p>
            </div>
            <div className="metric-card">
              <h3>Beta Waves</h3>
              <p className="metric-value">{eegData ? eegData.channels.beta.toFixed(2) : '-'} μV</p>
            </div>
            <div className="metric-card">
              <h3>Delta Waves</h3>
              <p className="metric-value">{eegData ? eegData.channels.delta.toFixed(2) : '-'} μV</p>
            </div>
            <div className="metric-card">
              <h3>Theta Waves</h3>
              <p className="metric-value">{eegData ? eegData.channels.theta.toFixed(2) : '-'} μV</p>
            </div>
          </div>
          
          <div className="analysis-results">
            <h2>Analysis Results</h2>
            <p>{sessionActive ? 'Recording in progress...' : 'Start a recording session to see results'}</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>NeuroAdapt Dashboard v0.1.0 | © 2025 NeuroAdapt Technologies</p>
      </footer>
    </div>
  )
}

export default App