import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './app.css'
import dotenv from 'dotenv'
dotenv.config()

/**
 * Render
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

export { ClientAPI } from './api'
