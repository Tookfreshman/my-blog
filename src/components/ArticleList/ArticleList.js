import './ArticleList.less'
import ArticleListItem from './ArticleListItem'
import React, { Component } from 'react'

class ArticleList extends Component {
  render() {
    const list = this.props.list
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
