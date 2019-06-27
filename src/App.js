import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from '@/components/Loading/Loading'
import './App.less'
import { connect } from 'react-redux'
import { BackTop } from 'antd'

const CommonHeader = Loadable({
  loader: () => import('@/components/CommonHeader/CommonHeader'),
  loading: Loading
})

const CommonFooter = Loadable({
  loader: () => import('@/components/CommonFooter/CommonFooter'),
  loading: Loading
})

const MiddlePage = Loadable({
  loader: () => import('@/components/MiddlePage/MiddlePage'),
  loading: Loading
})

const Home = Loadable({
  loader: () => import('@/pages/Home/Home'),
  loading: Loading
})

const Setting = Loadable({
  loader: () => import('@/pages/PersonalSettings/Setting'),
  loading: Loading
})

const OtherHomePage = Loadable({
  loader: () => import('@/pages/OtherHomePage/OtherHomePage'),
  loading: Loading
})

const Publish = Loadable({
  loader: () => import('@/pages/Publish/Publish'),
  loading: Loading
})

const EditSetting = Loadable({
  loader: () => import('@/pages/EditSetting/EditSetting'),
  loading: Loading
})

const BlogDetails = Loadable({
  loader: () => import('@/pages/BlogDetails/BlogDetails'),
  loading: Loading
})

class App extends Component {
  render() {
    const { loadingFlag } = this.props
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
                <Route path="/middlePage" component={MiddlePage} />
                <Redirect from="/*" to="/home" />
              </Switch>
            </div>
          </div>
          {loadingFlag && <Loading />}
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
