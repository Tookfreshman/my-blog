import React, { Component } from 'react'
import { Spin, Icon } from 'antd'
import './Loading.less'

const antIcon = (
  <Icon
    type="loading"
    style={{
      fontSize: 24
    }}
    spin="spin"
  />
)

export default class Loading extends Component {
  render() {
    return (
      <div className="loading-wrapper">
        <Spin className="loading" indicator={antIcon} />
      </div>
    )
  }
}
