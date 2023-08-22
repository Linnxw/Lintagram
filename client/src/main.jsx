import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import eruda from "eruda"
import {BrowserRouter as Router} from "react-router-dom"
eruda.init()
ReactDOM.createRoot(document.getElementById('root')).render(
   <Router>
    <App />
   </Router>
)
