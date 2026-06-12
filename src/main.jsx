import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/tokens.css'
import './styles/animations.css'
import './styles/effects.css'
import './styles.css'
import './styles/final-polish.css'
import './styles/luxury-rebuild.css'
import './styles/emergency-luxury-redesign.css'
import './styles/tulus-clean-rebuild.css'
import './styles/tulus-major-platform.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)