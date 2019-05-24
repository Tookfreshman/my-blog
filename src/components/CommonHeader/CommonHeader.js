import './CommonHeader.less'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Popover, Modal, Input, Form } from 'antd'

import { isValidUserName, isValidPassword } from '@/utils/validateReg.js'

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
export default class CommonHeader extends Component {
  constructor(props) {
    super(props)
    this.submitRegister = this.submitRegister.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleRegisterAlert = this.toggleRegisterAlert.bind(this)
    this.state = {
      isLoggedIn: false,
      showLoginAlert: false,
      showRegisterAlert: false
    }
  }
  submitRegister() {
    this.form.validForm()
  }
  handleSubmit(obj) {
    console.log(obj)
  }

  toggleRegisterAlert() {
    const val = this.state.showRegisterAlert
    if (val) {
      this.form.props.form.resetFields()
    }
    this.setState({
      showRegisterAlert: !val
    })
  }
  render() {
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
              <div className="user-login">登录</div>
              <div className="user-register" onClick={this.toggleRegisterAlert}>
                注册
              </div>
            </div>
          )}
        </div>
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
          <WrappedLoginForm
            wrappedComponentRef={form => (this.form = form)}
            handleSubmit={this.handleSubmit}
          />
        </Modal>
      </header>
    )
  }
}

const checkUserName = (rule, value, callback) => {
  if (!value) {
    callback()
    return
  }
  if (!isValidUserName(value)) {
    callback('请输入正确格式的用户名')
    return
  }
  callback()
}

const checkPassword = (rule, value, callback) => {
  if (!value) {
    callback()
    return
  }
  if (!isValidPassword(value)) {
    callback('请输入正确格式的密码')
    return
  }
  callback()
}

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      canSeePassword: false
    }
    this.togglePassword = this.togglePassword.bind(this)
  }
  togglePassword = () => {
    let val = !this.state.canSeePassword
    this.setState({
      canSeePassword: val
    })
  }
  validForm = () => {
    const form = this.props.form
    form.validateFields((err, values) => {
      if (!err) {
        const params = form.getFieldsValue()
        this.props.handleSubmit(params)
      } else {
        return false
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const canSee = this.state.canSeePassword
    return (
      <Form layout="vertical">
        <Form.Item extra="账号由字母开头，6-20位字母与数字组成，注册之后不能修改">
          {getFieldDecorator('username', {
            rules: [
              { required: true, message: '请输入用户名' },
              { validator: checkUserName }
            ]
          })(
            <Input
              prefix={
                <span
                  className="iconfont iconuser-s"
                  style={{ color: '#ccc' }}
                />
              }
              placeholder="Username"
              autoComplete="off"
            />
          )}
        </Form.Item>
        <Form.Item extra="6-20位密码，只能使用数字、字母、英文标点符号">
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '请输入密码' },
              { validator: checkPassword }
            ]
          })(
            <Input
              prefix={
                <span
                  className="iconfont iconmima1"
                  style={{ color: '#ccc' }}
                />
              }
              suffix={
                <span
                  className={`iconfont ${
                    canSee === false ? 'iconyanjing' : 'iconyanjing1'
                  }`}
                  style={{ color: '#ccc', cursor: 'pointer' }}
                  onClick={this.togglePassword}
                />
              }
              type={canSee === false ? 'password' : 'text'}
              placeholder="Password"
            />
          )}
        </Form.Item>
      </Form>
    )
  }
}

const WrappedLoginForm = Form.create({ name: 'horizontal_login' })(LoginForm)
