import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Loading from '@/components/Loading/Loading'
import './App.css'
import Home from './pages/Home/Home'
import myBlog from './pages/myBlog/myBlog'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route path="/home" component={Home} />
          <Route path="/myBlog" component={myBlog} />
          {this.props.loadingFlag && <Loading />}
        </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { loadingFlag: state.loadingFlag }
}
export default connect(mapStateToProps)(App)
