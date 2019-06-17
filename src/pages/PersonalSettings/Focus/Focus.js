import './Focus.less'
import React, { Component } from 'react'
import { Row, Col, Badge, Card, Avatar } from 'antd'

class Focus extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const Meta = Card.Meta
    return (
      <div className="focus">
        <Row>
          <Col span={24}>
            <div>我的关注（25）</div>
          </Col>
        </Row>
        <Row style={{ marginTop: '20px' }}>
          <Col span={24}>
            <Card style={{ width: 80 }}>
              <Avatar shape="square" size={80} icon="user" />
              <Meta title="123123" />
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: '20px' }}>
          <Col span={24}>
            <div>关注我的（25）</div>
          </Col>
        </Row>
        <Row style={{ marginTop: '20px' }}>
          <Col span={24}>
            <Card style={{ width: 80 }}>
              <Avatar shape="square" size={80} icon="user" />
              <Meta title="123123" />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Focus
