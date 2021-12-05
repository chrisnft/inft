import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

/**
 * Render
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

export { API } from './api'
