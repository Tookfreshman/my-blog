import './CommonHeader.less'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Popover, Modal } from 'antd'
import { register, login } from '@/api/userControll'
import { WrappedRegisterForm } from '../WrappedRegisterForm/WrappedRegisterForm'
import WrappedLoginForm from '../WrappedLoginForm/WrappedLoginForm'

const navContent = (
  <ul className="avatar-dropdown">
    <NavLink to="/home">
      <li>
        <span className="iconfont iconuser-s" />
        我的主页
      </li>
    </NavLink>
    <NavLink to="/home">
      <li>
        <span className="iconfont icontuichu" />
        退出
      </li>
    </NavLink>
  </ul>
)
class CommonHeader extends Component {
  constructor(props) {
    super(props)
    this.submitRegister = this.submitRegister.bind(this)
    this.submitLogin = this.submitLogin.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleRegisterAlert = this.toggleRegisterAlert.bind(this)
    this.toggleLoginAlert = this.toggleLoginAlert.bind(this)
    this.state = {
      isLoggedIn: false,
      showLoginAlert: false,
      showRegisterAlert: false
    }
  }

  submitRegister() {
    this.registerForm.validForm()
  }

  submitLogin() {
    this.loginForm.validForm()
  }

  handleSubmit(obj) {
    register(obj)
      .then(res => {
        if (res.code === '0') {
          console.log(res)
        } else {
          this.$message.error(res.msg)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  toggleLoginAlert() {
    const val = this.state.showLoginAlert
    if (val) {
      this.loginForm.props.form.resetFields()
    }
    this.setState({
      showLoginAlert: !val
    })
  }
  toggleRegisterAlert() {
    const val = this.state.showRegisterAlert
    if (val) {
      this.registerForm.props.form.resetFields()
    }
    this.setState({
      showRegisterAlert: !val
    })
  }
  render() {
    console.log(this.props)
    const isLoggedIn = this.state.isLoggedIn
    return (
      <header className="common-header">
        <div className="common-header-inner">
          <div className="blog-name">Took`s博客</div>
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
                  <img
                    className="avatar"
                    width="30"
                    height="30"
                    src="https://pic3.zhimg.com/73168d1df9ac14fc196678361b390558_is.jpg"
                    alt="头像"
                  />
                </Popover>
              </div>
            </div>
          ) : (
            <div className="user-login-register">
              <div className="user-login" onClick={this.toggleLoginAlert}>
                登录
              </div>
              <div className="user-register" onClick={this.toggleRegisterAlert}>
                注册
              </div>
            </div>
          )}
        </div>
        <Modal
          visible={this.state.showLoginAlert}
          width={400}
          mask={false}
          wrapClassName="login-modal"
          okText="登录"
          cancelText="取消"
          onOk={this.submitLogin}
          onCancel={this.toggleLoginAlert}
        >
          <WrappedLoginForm
            wrappedComponentRef={form => (this.loginForm = form)}
          />
        </Modal>
        <Modal
          visible={this.state.showRegisterAlert}
          closable={false}
          wrapClassName="register-modal"
          okText="注册"
          cancelText="取消"
          onOk={this.submitRegister}
          onCancel={this.toggleRegisterAlert}
          maskClosable={false}
        >
          <h1>欢迎注册</h1>
          <WrappedRegisterForm
            wrappedComponentRef={form => (this.registerForm = form)}
            handleSubmit={this.handleSubmit}
          />
        </Modal>
      </header>
    )
  }
}

export default CommonHeader
