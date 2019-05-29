import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Loading from '@/components/Loading/Loading'
import CommonHeader from '@/components/CommonHeader/CommonHeader'
import CommonFooter from '@/components/CommonFooter/CommonFooter'
import './App.less'
import Home from './pages/Home/Home'
import myBlog from './pages/myBlog/myBlog'
import { connect } from 'react-redux'
import { BackTop } from 'antd'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <CommonHeader />
          <div className="pages-wrapper">
            <div className="pages-content">
              <Route path="/" component={Home} />
              <Route path="/myBlog" component={myBlog} />
            </div>
          </div>
          {this.props.loadingFlag && <Loading />}
          <CommonFooter />
        </BrowserRouter>
        <BackTop>
          <div className="ant-back-top-inner">UP</div>
        </BackTop>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { loadingFlag: state.loadingFlag }
}
export default connect(mapStateToProps)(App)
