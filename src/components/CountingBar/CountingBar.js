import './CountingBar.less'
import React, { Component } from 'react'
import { Row, Col } from 'antd'

class CountingBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const border = this.props.border ? true : false
    const data = this.props.data
    const width = 24 / data.length
    const InnerElement = data.map(item => (
      <Row span={width} key={item.name} className="padding-20">
        <Col>{item.name}</Col>
        <Col>{item.val}</Col>
      </Row>
    ))
    return (
      <div className={`counting-bar-wrapper ${border ? 'border' : ''}`}>
        {InnerElement}
      </div>
    )
  }
}

export default CountingBar
