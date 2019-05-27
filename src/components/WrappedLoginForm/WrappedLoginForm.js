import { Input, Form, message } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      canSeePassword: false
    }
    this.togglePassword = this.togglePassword.bind(this)
  }

  togglePassword() {
    let val = !this.state.canSeePassword
    this.setState({
      canSeePassword: val
    })
  }

  validForm() {
    const form = this.props.form
    const params = form.getFieldsValue()
    if (!params.userName) {
      message.error('请输入用户名')
      return
    }
    if (!params.password) {
      message.error('请输入密码')
      return
    }
    // if(params)
    // this.props.handleSubmit(params)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const FormItem = Form.Item
    const canSee = this.state.canSeePassword
    return (
      <Form layout="vertical">
        <div className="login-title">登录</div>
        <FormItem>
          {getFieldDecorator('userName')(
            <Input
              prefix={
                <span
                  className="iconfont iconuser-s"
                  style={{ color: '#ccc' }}
                />
              }
              placeholder="Username"
              autoComplete="off"
              type="text"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password')(
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
        </FormItem>
      </Form>
    )
  }
}

const WrappedLoginForm = Form.create({ name: 'horizontal_login' })(LoginForm)

const mapStateToProps = state => {
  return { loadingFlag: state.loadingFlag }
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedLoginForm)
