import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './registerVueElement.js' // Register Vue custom element before rendering React app
import './index.css'

// Create React root and render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)