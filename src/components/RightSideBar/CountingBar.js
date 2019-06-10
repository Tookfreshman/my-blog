import './RightSideBar'
import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { getAllUserCount } from '@/api/countController'
class CountingBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allUserCount: 0
    }
  }
  componentWillMount() {
    getAllUserCount({})
      .then(res => {
        if (res.code === '0') {
          this.setState({
            allUserCount: res.data
          })
        } else {
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const allUserCount = this.state.allUserCount
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
          <Row>23423</Row>
        </Col>
      </Row>
    )
  }
}

export default CountingBar
