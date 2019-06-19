import './ArticleList.less'
import ArticleListItem from './ArticleListItem'
import React, { Component } from 'react'
import { getRecentlyBlogs } from '@/api/articles'
import moment from 'moment'

class ArticleList extends Component {
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
          res.data.forEach(item => {
            item.publishTime = moment(item.publishTime).format('YYYY-MM-DD')
            item.articleType =
              item.articleType === 1
                ? '技术类'
                : item.articleType === 2
                ? '个人日记'
                : '心情'
          })
          this.setState({
            list: res.data
          })
        } else {
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { list } = this.state
    return (
      <ul className="article-list">
        {list.map((item, index) => (
          <ArticleListItem data={item} key={index} />
        ))}
      </ul>
    )
  }
}

export default ArticleList
