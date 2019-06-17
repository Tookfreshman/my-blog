import './RightSideBar'
import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { getAllUserCount, getViewerCount } from '@/api/countController'
class CountingBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allUserCount: 0,
      allViewerCount: 0
    }
  }
  componentWillMount() {
    getViewerCount({})
      .then(res => {
        if (res.code === '0') {
          this.setState({
            allViewerCount: res.data
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
    getAllUserCount({})
      .then(res => {
        if (res.code === '0') {
          this.setState({
            allUserCount: res.data
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const allUserCount = this.state.allUserCount
    const allViewerCount = this.state.allViewerCount
    return (
      <Row>
        <Col span={8}>
          <Row>总用户</Row>
          <Row>{allUserCount}</Row>
        </Col>
        <Col span={8} className="center">
          <Row>总文章</Row>
          <Row>34</Row>
        </Col>
        <Col span={8}>
          <Row>浏览量</Row>
          <Row>{allViewerCount}</Row>
        </Col>
      </Row>
    )
  }
}

export default CountingBar
