import './ArticleList.less'
import ArticleListItem from './ArticleListItem'
import React, { Component } from 'react'
import moment from 'moment'

class ArticleList extends Component {
  render() {
    const { list } = this.props
    list.forEach(item => {
      item.publishTime = moment(item.publishTime).format('YYYY-MM-DD')
      item.articleType =
        item.articleType === '1'
          ? '技术类'
          : item.articleType === '2'
          ? '个人日记'
          : '心情'
    })
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
