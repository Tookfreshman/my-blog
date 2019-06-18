import './SettingMenu.less'
import React, { Component } from 'react'
import { Menu } from 'antd'
import { NavLink, withRouter } from 'react-router-dom'

class SettingMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: ''
    }
  }

  componentWillMount() {
    this.setState({
      location: this.props.location.pathname
    })
  }

  render() {
    const MenuItem = Menu.Item
    const location = this.state.location
    return (
      <Menu defaultSelectedKeys={[location]}>
        <MenuItem key="/setting/view">
          <NavLink to="/setting/view">
            <span>
              <i className="iconfont iconziliao3" />
              <span style={{ marginLeft: '10px' }}>个人资料</span>
            </span>
          </NavLink>
        </MenuItem>
        <MenuItem key="/setting/focus">
          <NavLink to="/setting/focus">
            <span>
              <i className="iconfont iconguanzhu" />
              <span style={{ marginLeft: '10px' }}>关注</span>
            </span>
          </NavLink>
        </MenuItem>
      </Menu>
    )
  }
}

export default withRouter(SettingMenu)
