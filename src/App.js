import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Loading from '@/components/Loading/Loading'
import CommonHeader from '@/components/CommonHeader/CommonHeader'
import CommonFooter from '@/components/CommonFooter/CommonFooter'
import './App.less'
import Home from '@/pages/Home/Home'
import Setting from '@/pages/PersonalSettings/Setting'
import OtherHomePage from '@/pages/OtherHomePage/OtherHomePage'
import Publish from '@/pages/Publish/Publish'
import EditSetting from '@/pages/EditSetting/EditSetting'
import BlogDetails from '@/pages/BlogDetails/BlogDetails'
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
              <Switch>
                <Route path="/home" component={Home} />
                <Route path="/editSetting" component={EditSetting} />
                <Route path="/setting" component={Setting} />
                <Route path="/otherHomePage" component={OtherHomePage} />
                <Route path="/publish" component={Publish} />
                <Route path="/blogDetails" component={BlogDetails} />
                <Redirect from="/*" to="/home" />
              </Switch>
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
  return { loadingFlag: state.loadingFlag, isLogin: state.isLogin }
}
export default connect(mapStateToProps)(App)
