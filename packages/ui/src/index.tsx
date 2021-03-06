import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './app.css'

/**
 * Render
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

/** API */
export { API } from './api'
