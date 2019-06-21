import { Input, Form } from 'antd'
import React, { Component } from 'react'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      canSeePassword: false
    }
    this.togglePassword = this.togglePassword.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  togglePassword() {
    let val = !this.state.canSeePassword
    this.setState({
      canSeePassword: val
    })
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.validForm()
    }
  }

  validForm() {
    const form = this.props.form
    form.validateFields((err, values) => {
      if (!err) {
        this.props.handleLoginSubmit(values)
        return
      } else {
        return false
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const FormItem = Form.Item
    const canSee = this.state.canSeePassword
    return (
      <Form layout="vertical">
        <div className="login-title">登录</div>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名' }]
          })(
            <Input
              prefix={
                <span
                  className="iconfont iconuser-s"
                  style={{ color: '#ccc' }}
                />
              }
              placeholder="用户名"
              autoComplete="off"
              type="text"
              autoFocus
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }]
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
                  onClick={() => this.togglePassword()}
                />
              }
              type={canSee === false ? 'password' : 'text'}
              placeholder="密码"
              onKeyUp={e => this.handleKeyUp(e)}
            />
          )}
        </FormItem>
      </Form>
    )
  }
}

const WrappedLoginForm = Form.create({ name: 'horizontal_login' })(LoginForm)

export default WrappedLoginForm
