import './Focus.less'
import React, { Component } from 'react'
import { Row, Col, Card, Avatar } from 'antd'
import { findFocusDataByUserId } from '@/api/userController'
import storage from '@/utils/storage'
import { withRouter } from 'react-router-dom'

class Focus extends Component {
  constructor(props) {
    super(props)
    this.redirect = this.redirect.bind(this)
    this.state = {
      data: {
        fansNum: 0,
        focusNum: 0,
        fansList: [],
        focusList: []
      }
    }
  }

  componentDidMount() {
    this.queryFocusDataByuserId()
  }

  redirect(userId) {
    this.props.history.push(`/otherHomePage?id=${userId}`)
  }

  queryFocusDataByuserId() {
    const userInfo = storage.ls.get('userInfo') || {}
    let params = {
      userId: userInfo.userId
    }
    findFocusDataByUserId(params)
      .then(res => {
        if (res.code === '0') {
          this.setState({
            data: res.data
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const Meta = Card.Meta
    const { data } = this.state
    const focusCards = data.focusList.map(item => (
      <Card
        style={{ width: 80 }}
        key={item.nickName}
        onClick={e => this.redirect(item.userId, e)}
      >
        <Avatar shape="square" size={80} icon="user" src={item.portraitUrl} />
        <Meta title={item.nickName || item.userName} style={{ marginTop: 5 }} />
      </Card>
    ))
    const fansCards = data.fansList.map(item => (
      <Card
        style={{ width: 80 }}
        key={item.nickName}
        onClick={e => this.redirect(item.userId, e)}
      >
        <Avatar shape="square" size={80} icon="user" src={item.portraitUrl} />
        <Meta title={item.nickName || item.userName} style={{ marginTop: 5 }} />
      </Card>
    ))
    return (
      <div className="focus">
        <Row>
          <Col span={24}>
            <div>我的关注（{data.focusNum}）</div>
          </Col>
        </Row>
        <div style={{ marginTop: '20px' }} className="focus-list">
          {focusCards}
        </div>
        <Row style={{ marginTop: '20px' }}>
          <Col span={24}>
            <div>关注我的（{data.fansNum}）</div>
          </Col>
        </Row>
        <div style={{ marginTop: '20px' }} className="fans-list">
          {fansCards}
        </div>
      </div>
    )
  }
}

export default withRouter(Focus)
