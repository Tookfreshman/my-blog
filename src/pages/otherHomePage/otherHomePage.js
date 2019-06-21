import './OtherHomePage.less'
import React, { Component } from 'react'
import { Card, Avatar, Button, message } from 'antd'
import CountingBar from '@/components/CountingBar/CountingBar'
import {
  getUserBriefByUserId,
  focusSomeone,
  unfocusSomeone,
  isFocusSomeone,
  findFansAndFocusByuserId
} from '@/api/userController'
import getUrlParam from '@/utils/getUrlParam'
import { connect } from 'react-redux'

class OtherHomePage extends Component {
  constructor(props) {
    super(props)
    this.focus = this.focus.bind(this)
    this.unfocus = this.unfocus.bind(this)
    this.state = {
      userData: {},
      isFollowed: false,
      fansNum: 0,
      focusNum: 0
    }
  }

  componentDidMount() {
    this.queryUserBriefByUserId()
    this.queryIsFocus()
    this.queryFansAndFocusByuserId()
  }

  queryUserBriefByUserId() {
    let userId = getUrlParam('userId')
    getUserBriefByUserId({ userId })
      .then(res => {
        if (res.code === '0') {
          this.setState({
            userData: res.data
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  queryIsFocus() {
    let userId = getUrlParam('userId')
    isFocusSomeone({ targetUserId: userId })
      .then(res => {
        if (res.code === '0') {
          if (res.data) {
            this.setState({
              isFollowed: true
            })
          } else {
            this.setState({
              isFollowed: false
            })
          }
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  queryFansAndFocusByuserId() {
    let userId = getUrlParam('userId')
    findFansAndFocusByuserId({ userId })
      .then(res => {
        if (res.code === '0') {
          this.setState({
            fansNum: res.data.fansNum,
            focusNum: res.data.focusNum
          })
          console.log(this.state)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  focus() {
    if (!this.props.isLogin) {
      message.warn('请先登录')
    } else {
      let userId = getUrlParam('userId')
      if (userId === this.props.userInfo.userId) {
        message.error('不能关注自己')
        return
      }
      let data = {
        focus: userId
      }
      focusSomeone(data)
        .then(res => {
          if (res.code === '0') {
            message.success('关注成功')
            this.queryIsFocus()
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  unfocus() {
    if (!this.props.isLogin) {
      message.warn('请先登录')
    } else {
      let userId = getUrlParam('userId')
      let data = {
        focus: userId
      }
      unfocusSomeone(data)
        .then(res => {
          if (res.code === '0') {
            message.success('取消关注成功')
            this.queryIsFocus()
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  render() {
    const data = [
      { name: '他的粉丝', val: this.state.fansNum },
      { name: '他的关注', val: this.state.focusNum }
    ]
    const userData = this.state.userData
    const isFollowed = this.state.isFollowed
    return (
      <div className="other-homepage-content">
        <div className="other-homepage-left-side">
          <Card style={{ width: '100%' }} className="user-info-card">
            <Avatar size={80} icon="user" src={userData.portraitUrl} />
            <div className="user-info">
              <div className="user-name">
                <div className="name txt-ellipsis">{userData.nickName}</div>
                <div className="follow">
                  <Button
                    type="primary"
                    onClick={() => this.focus()}
                    style={{ display: isFollowed ? 'none' : 'block' }}
                  >
                    关注
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => this.unfocus()}
                    style={{ display: isFollowed ? 'block' : 'none' }}
                  >
                    取消关注
                  </Button>
                </div>
              </div>
              <div className="user-brief txt-ellipsis">
                <span className="iconfont icongerenjianjie" />
                {userData.brief}
              </div>
            </div>
          </Card>
        </div>
        <div className="other-homepage-right-side">
          <CountingBar data={data} border={true} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { userInfo: state.userInfo, isLogin: state.isLogin }
}

export default connect(mapStateToProps)(OtherHomePage)
