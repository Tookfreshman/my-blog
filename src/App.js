import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
const yes = true

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route path="/" exact={yes} component={Home} />
        </div>
      </Router>
    </div>
  )
}

export default App
