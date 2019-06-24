import './OtherHomePage.less'
import React, { Component } from 'react'
import { Card, Avatar, Button, message, Tabs } from 'antd'
import CountingBar from '@/components/CountingBar/CountingBar'
import {
  getUserBriefByUserId,
  focusSomeone,
  unfocusSomeone,
  isFocusSomeone,
  findFansAndFocusByuserId
} from '@/api/userController'
import { querySomeoneBlogsByUserId } from '@/api/articles'
import ArticleList from '@/components/ArticleList/ArticleList'
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
      focusNum: 0,
      list: []
    }
  }

  componentDidMount() {
    this.queryUserBriefByUserId()
    this.queryIsFocus()
    this.queryFansAndFocusByuserId()
    this.queryBlogsByPage()
  }

  queryBlogsByPage() {
    let userId = getUrlParam('userId')
    let params = {
      userId,
      pageSize: 10,
      pageNum: 1
    }
    querySomeoneBlogsByUserId(params)
      .then(res => {
        if (res.code === '0') {
          this.setState({
            list: res.data
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
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
            this.queryFansAndFocusByuserId()
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
            this.queryFansAndFocusByuserId()
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  render() {
    const { userData, isFollowed, list, fansNum, focusNum } = this.state
    const data = [
      { name: '他的粉丝', val: fansNum },
      { name: '他的关注', val: focusNum }
    ]
    const { TabPane } = Tabs
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
                {userData.brief ? userData.brief : '暂无简介'}
              </div>
            </div>
          </Card>
          <div className="other-home-page-main-content">
            <Tabs defaultActiveKey="1">
              <TabPane tab="他的文章" key="1">
                <div className="blog-list">
                  <ArticleList list={list} />
                </div>
              </TabPane>
            </Tabs>
          </div>
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
