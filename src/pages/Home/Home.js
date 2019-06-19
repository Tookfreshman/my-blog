import './Home.less'
import React, { Component } from 'react'
import { Menu } from 'antd'
import ArticleList from '@/components/ArticleList/ArticleList'
import RightSideBar from '@/components/RightSideBar/RightSideBar'
export default class Home extends Component {
  render() {
    const MenuItem = Menu.Item
    return (
      <div className="home-content">
        <div className="home-left-side">
          <Menu defaultSelectedKeys={['recent']}>
            <MenuItem key="recent">最新博客</MenuItem>
          </Menu>
          <div className="article-list">
            <ArticleList />
          </div>
        </div>
        <div className="home-right-side">
          <RightSideBar />
        </div>
      </div>
    )
  }
}
