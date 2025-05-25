import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PlantProvider } from '../context/plantsContext.jsx';
createRoot(document.getElementById('root')).render(
  <PlantProvider>
  <StrictMode>
    <App />
  </StrictMode>,
  </PlantProvider>
)
