import './Home.less'
import React, { Component } from 'react'
import { Menu } from 'antd'
import ArticleList from '@/components/ArticleList/ArticleList'
import RightSideBar from '@/components/RightSideBar/RightSideBar'
import { getRecentlyBlogs } from '@/api/articles'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    this.getBlogs()
  }

  getBlogs() {
    getRecentlyBlogs()
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
  render() {
    const MenuItem = Menu.Item
    const { list } = this.state
    return (
      <div className="home-content">
        <div className="home-left-side">
          <Menu defaultSelectedKeys={['recent']}>
            <MenuItem key="recent">最新博客</MenuItem>
          </Menu>
          <div className="article-list">
            <ArticleList list={list} />
          </div>
        </div>
        <div className="home-right-side">
          <RightSideBar />
        </div>
      </div>
    )
  }
}
