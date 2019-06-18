import './SettingView.less'
import React, { Component } from 'react'
import { Form, Avatar, Button } from 'antd'
import { NavLink } from 'react-router-dom'
import { getUserBrief } from '@/api/userController'

class SettingView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userBrief: {}
    }
  }

  componentWillMount() {
    getUserBrief()
      .then(res => {
        if (res.code === '0') {
          this.setState({
            userBrief: res.data
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const FormItem = Form.Item
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 22 }
      }
    }
    const userBrief = this.state.userBrief
    return (
      <Form {...formItemLayout} layout="horizontal">
        <FormItem label="头像">
          <Avatar
            shape="square"
            size={64}
            icon="user"
            src={userBrief.portraitUrl}
          />
        </FormItem>
        <FormItem label="昵称">
          {userBrief.nickName ? userBrief.nickName : '--'}
        </FormItem>
        <FormItem label="生日">
          {userBrief.bornDate ? userBrief.bornDate : '--'}
        </FormItem>
        <FormItem label="性别">
          {userBrief.sex ? (userBrief.sex === 1 ? '男' : '女') : '--'}
        </FormItem>
        <FormItem label="地址">
          {userBrief.region ? userBrief.region : '--'}
        </FormItem>
        <FormItem label="行业">
          {userBrief.industry ? userBrief.industry : '--'}
        </FormItem>
        <FormItem label="简介">
          <div style={{ wordBreak: 'break-word' }}>{userBrief.brief}</div>
        </FormItem>
        <FormItem>
          <NavLink to="/setting/edit" style={{ marginLeft: '50px' }}>
            <Button type="primary">修改</Button>
          </NavLink>
        </FormItem>
      </Form>
    )
  }
}

export default SettingView
