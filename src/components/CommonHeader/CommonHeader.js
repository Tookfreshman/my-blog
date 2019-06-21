import './CommonHeader.less'
import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { Popover, Modal, message, Avatar } from 'antd'
import { register, login, logout, getCurrentUser } from '@/api/userController'
import { updateViewerCount } from '@/api/countController'
import { WrappedRegisterForm } from '../WrappedRegisterForm/WrappedRegisterForm'
import WrappedLoginForm from '../WrappedLoginForm/WrappedLoginForm'
import { connect } from 'react-redux'
import md5EncryptAgain from '@/utils/md5EncryptAgain'
import md5 from 'js-md5'

class CommonHeader extends Component {
  constructor(props) {
    super(props)
    this.submitRegister = this.submitRegister.bind(this)
    this.submitLogin = this.submitLogin.bind(this)
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this)
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.toggleRegisterAlert = this.toggleRegisterAlert.bind(this)
    this.toggleLoginAlert = this.toggleLoginAlert.bind(this)
    this.resetLoginForm = this.resetLoginForm.bind(this)
    this.resetRegisterForm = this.resetRegisterForm.bind(this)
    this.handleLoginOut = this.handleLoginOut.bind(this)
    this.state = {
      isLoggedIn: false,
      showLoginAlert: false,
      showRegisterAlert: false,
      userInfo: {}
    }
  }

  componentWillMount() {
    updateViewerCount().catch(error => {
      console.log(error)
    })
    this.queryUserInfo()
  }

  queryUserInfo() {
    getCurrentUser()
      .then(res => {
        if (res.code === '0') {
          if (!res.data.nickName) {
            this.redirectToSetting()
          }
          this.props.addUserInfo(res.data)
          this.props.login()
          this.setState({
            isLoggedIn: true,
            userInfo: res.data
          })
        } else {
          this.props.removeUserInfo()
          this.props.logOut()
          this.setState({
            isLoggedIn: false
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleLoginOut() {
    this.props.setFlag()
    logout()
      .then(res => {
        this.props.removeFlag()
        if (res.code === '0') {
          this.props.removeUserInfo()
          this.props.logOut()
          this.setState({
            isLoggedIn: false
          })
        } else {
          message.error(res.msg)
        }
      })
      .catch(error => {
        this.props.removeFlag()
        console.log(error)
      })
  }

  submitRegister() {
    this.registerForm.validForm()
  }

  submitLogin() {
    this.loginForm.validForm()
  }

  handleLoginSubmit(obj) {
    this.props.setFlag()
    let encryptData = md5EncryptAgain(md5(obj.password).toLocaleUpperCase())
    obj.password = encryptData.md5Str
    obj.pt = encryptData.pt
    login(obj)
      .then(res => {
        this.props.removeFlag()
        if (res.code === '0') {
          message.success('登录成功')
          if (!res.data.nickName) {
            this.redirectToSetting()
          }
          this.props.addUserInfo(res.data)
          this.props.login()
          this.setState({
            showLoginAlert: false,
            isLoggedIn: true,
            userInfo: res.data
          })
        } else {
          message.error(res.msg)
        }
      })
      .catch(error => {
        this.props.removeFlag()
        message.error(error)
        console.log(error)
      })
  }

  handleRegisterSubmit(obj) {
    this.props.setFlag()
    let encryptData = md5EncryptAgain(md5(obj.password).toLocaleUpperCase())
    obj.password = encryptData.md5Str
    obj.pt = encryptData.pt
    register(obj)
      .then(res => {
        if (res.code === '0') {
          this.props.removeFlag()
          message.success('注册成功')
          this.setState({
            showRegisterAlert: false
          })
        } else {
          this.props.removeFlag()
          message.error(res.msg)
        }
      })
      .catch(error => {
        this.props.removeFlag()
        console.log(error)
        message.error(error)
      })
  }

  resetLoginForm() {
    this.loginForm.props.form.resetFields()
  }

  resetRegisterForm() {
    this.registerForm.props.form.resetFields()
  }

  toggleLoginAlert() {
    const val = this.state.showLoginAlert
    this.setState({
      showLoginAlert: !val
    })
  }

  redirectToSetting() {
    this.props.history.push('/editSetting')
  }

  toggleRegisterAlert() {
    const val = this.state.showRegisterAlert
    this.setState({
      showRegisterAlert: !val
    })
  }
  render() {
    const isLoggedIn = this.state.isLoggedIn
    const userInfo = this.state.userInfo
    const navContent = (
      <ul className="avatar-dropdown">
        <NavLink to="/setting/view">
          <li>
            <span className="iconfont iconyonghu" />
            我的主页
          </li>
        </NavLink>
        <NavLink to="/home">
          <li onClick={() => this.handleLoginOut()}>
            <span className="iconfont icontuichu" />
            退出
          </li>
        </NavLink>
      </ul>
    )
    return (
      <header className="common-header">
        <div className="common-header-inner">
          <div className="blog-name">图克的博客</div>
          <nav className="nav">
            <NavLink to="/home" className="nav-item">
              首页
            </NavLink>
            <NavLink to="/myBlog" className="nav-item">
              博客
            </NavLink>
          </nav>
          {isLoggedIn ? (
            <div className="userinfo">
              <NavLink to="/publish">
                <div className="pulish-blog">
                  <i className="iconfont iconxiepinglun" />
                  <span>写博客</span>
                </div>
              </NavLink>
              <div className="notice-ring">
                <span className="iconfont iconlingdang" />
                <span className="notice-num">12</span>
              </div>
              <div className="header-profile">
                <Popover
                  placement="bottom"
                  content={navContent}
                  trigger="click"
                >
                  <Avatar
                    shape="square"
                    size={30}
                    icon="user"
                    src={userInfo && userInfo.portraitUrl}
                  />
                </Popover>
              </div>
            </div>
          ) : (
            <div className="user-login-register">
              <div
                className="user-login"
                onClick={() => this.toggleLoginAlert()}
              >
                登录
              </div>
              <div
                className="user-register"
                onClick={() => this.toggleRegisterAlert()}
              >
                注册
              </div>
            </div>
          )}
        </div>
        <Modal
          visible={this.state.showLoginAlert}
          width={400}
          maskClosable={false}
          wrapClassName="login-modal"
          okText="登录"
          cancelText="取消"
          onOk={this.submitLogin}
          onCancel={this.toggleLoginAlert}
          centered={true}
          afterClose={this.resetLoginForm}
        >
          <WrappedLoginForm
            wrappedComponentRef={form => (this.loginForm = form)}
            handleLoginSubmit={this.handleLoginSubmit}
          />
        </Modal>
        <Modal
          visible={this.state.showRegisterAlert}
          closable={false}
          wrapClassName="register-modal"
          okText="注册"
          cancelText="取消"
          onOk={this.submitRegister}
          onCancel={() => this.toggleRegisterAlert()}
          maskClosable={false}
          afterClose={this.resetRegisterForm}
        >
          <h1>欢迎注册</h1>
          <WrappedRegisterForm
            wrappedComponentRef={form => (this.registerForm = form)}
            handleSubmit={this.handleRegisterSubmit}
          />
        </Modal>
      </header>
    )
  }
}

const mapStateToProps = state => {
  return { loadingFlag: state.loadingFlag, userInfo: state.userInfo }
}

const mapDispatchToProps = dispatch => {
  return {
    setFlag: () => {
      dispatch({
        type: 'SET_FLAG'
      })
    },
    removeFlag: () => {
      dispatch({
        type: 'REMOVE_FLAG'
      })
    },
    addUserInfo: userInfo => {
      dispatch({
        type: 'ADD_USERINFO',
        data: userInfo
      })
    },
    removeUserInfo: () => {
      dispatch({
        type: 'REMOVE_USER_INFO'
      })
    },
    getUserInfo: () => {
      dispatch({
        type: 'GET_USER_INFO'
      })
    },
    login: () => {
      dispatch({
        type: 'LOGIN'
      })
    },
    logOut: () => {
      dispatch({
        type: 'LOGOUT'
      })
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CommonHeader)
)
