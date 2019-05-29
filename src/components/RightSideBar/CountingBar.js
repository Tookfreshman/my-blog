import './RightSideBar'
import React, { Component } from 'react'
import { Row, Col } from 'antd'

class CountingBar extends Component {
  render() {
    return (
      <Row>
        <Col span={8}>
          <Row>总用户</Row>
          <Row>1231</Row>
        </Col>
        <Col span={8} className="center">
          <Row>总文章</Row>
          <Row>34</Row>
        </Col>
        <Col span={8}>
          <Row>浏览量</Row>
          <Row>23423</Row>
        </Col>
      </Row>
    )
  }
}

export default CountingBar
