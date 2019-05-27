import { Input, Form } from 'antd'
import React, { Component } from 'react'
import { isValidUserName, isValidPassword } from '@/utils/validateReg.js'
import { userInfoIsExistence } from '@/api/userControll'

class RegisterForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      canSeePassword: false
    }
    this.togglePassword = this.togglePassword.bind(this)
    this.canUse = this.canUse.bind(this)
  }

  canUse() {
    const userName = this.props.form.getFieldValue('userName')
    const isError = this.props.form.getFieldError('userName') ? true : false
    if (isError) {
      return
    }
    userInfoIsExistence({ userName })
      .then(res => {
        if (res.code === '0') {
        } else {
          this.props.form.setFields({
            userName: {
              value: userName,
              errors: [new Error(res.msg)]
            }
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  togglePassword() {
    let val = !this.state.canSeePassword
    this.setState({
      canSeePassword: val
    })
  }

  validForm() {
    const isError = this.props.form.getFieldError('userName') ? true : false
    if (isError) {
      return
    }
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
    const FormItem = Form.Item
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
    return (
      <Form layout="vertical">
        <FormItem extra="账号由字母开头，6-20位字母与数字组成，注册之后不能修改">
          {getFieldDecorator('userName', {
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
              type="text"
              placeholder="Username"
              autoComplete="off"
              onBlur={this.canUse}
            />
          )}
        </FormItem>
        <FormItem extra="6-20位密码，只能使用数字、字母、英文标点符号">
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
        </FormItem>
      </Form>
    )
  }
}

export const WrappedRegisterForm = Form.create({ name: 'horizontal_register' })(
  RegisterForm
)
