import './ArticleList.less'
import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'

class ArticleListItem extends Component {
  previewBlogDetails(id) {
    this.props.history.push(`/blogDetails?id=${id}`)
  }

  previewOtherHomePage(userId, e) {
    this.props.history.push(`/otherHomePage?userId=${userId}`)
    e.stopPropagation()
  }
  render() {
    const { data } = this.props
    return (
      <li onClick={this.previewBlogDetails.bind(this, data._id)}>
        <div className="list-wrapper">
          <div className="article-img-wrapper">
            <img
              src={require('../../assets/sprites.jpg')}
              alt="error"
              className="article-img"
            />
          </div>
          <div className="article-info">
            <h3
              className="article-title txt-ellipsis"
              title={data.title}
              style={{ cursor: 'pointer' }}
            >
              {data.title}
            </h3>
            <div className="target-article-info">
              <div
                onClick={this.previewOtherHomePage.bind(this, data.userId)}
                style={{ cursor: 'pointer' }}
                className="txt-ellipsis"
              >
                <span className="iconfont iconzuozhe" />
                <span className="p-5" title={data.author}>
                  {data.author}
                </span>
              </div>
              <div className="txt-ellipsis">
                <span className="iconfont iconyanjing1" />
                <span className="p-5" title={data.viewerCount}>
                  {data.viewerCount}
                </span>
              </div>
              <div className="txt-ellipsis">
                <span className="iconfont iconshijian" />
                <span className="p-5" title={data.publishTime}>
                  {data.publishTime}
                </span>
              </div>
              <div className="txt-ellipsis">
                <span className="iconfont iconduomeitiicon" />
                <span className="p-5" title={data.articleType}>
                  {data.articleType}
                </span>
              </div>
            </div>
            <p className="article-brief">{data.article}</p>
          </div>
        </div>
      </li>
    )
  }
}

export default withRouter(ArticleListItem)
