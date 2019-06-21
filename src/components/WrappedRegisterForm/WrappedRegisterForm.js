import { Input, Form } from 'antd'
import React, { Component } from 'react'
import { isValidUserName, isValidPassword } from '@/utils/validateReg.js'
import { userNameIsExistence } from '@/api/userController'

class RegisterForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      canSeePassword1: false,
      canSeePassword2: false
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
    userNameIsExistence({ userName })
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

  togglePassword(type) {
    if (type === 1) {
      let val = !this.state.canSeePassword1
      this.setState({
        canSeePassword1: val
      })
    } else {
      let val = !this.state.canSeePassword2
      this.setState({
        canSeePassword2: val
      })
    }
  }

  validForm() {
    const isError = this.props.form.getFieldError('userName') ? true : false
    if (isError) {
      return
    }
    const form = this.props.form
    form.validateFields((err, values) => {
      if (!err) {
        if (values.password !== values.rePassword) {
          const password = this.props.form.getFieldValue('password')
          this.props.form.setFields({
            password: {
              value: password,
              errors: [new Error('密码输入不相同，请再次确认')]
            }
          })
          return
        }
        delete values.rePassword
        this.props.handleSubmit(values)
      } else {
        return false
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const canSee1 = this.state.canSeePassword1
    const canSee2 = this.state.canSeePassword2
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
              placeholder="用户名"
              autoComplete="off"
              onBlur={() => this.canUse()}
              autoFocus
            />
          )}
        </FormItem>
        <FormItem extra="6-20位密码，只能使用数字、字母、英文标点符号，并且至少包含以上两种">
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
                    canSee1 === false ? 'iconyanjing' : 'iconyanjing1'
                  }`}
                  style={{ color: '#ccc', cursor: 'pointer' }}
                  onClick={() => this.togglePassword(1)}
                />
              }
              type={canSee1 === false ? 'password' : 'text'}
              placeholder="密码"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('rePassword', {
            rules: [
              { required: true, message: '请再次输入密码' },
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
                    canSee2 === false ? 'iconyanjing' : 'iconyanjing1'
                  }`}
                  style={{ color: '#ccc', cursor: 'pointer' }}
                  onClick={() => this.togglePassword(2)}
                />
              }
              type={canSee2 === false ? 'password' : 'text'}
              placeholder="确认密码"
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
