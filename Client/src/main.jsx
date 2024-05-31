import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './redux/store.js'
import {Provide} from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provide store={store}>
    <App />
  </Provide>,
)
