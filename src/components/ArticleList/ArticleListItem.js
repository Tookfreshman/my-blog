import './ArticleList.less'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class ArticleListItem extends Component {
  render() {
    const data = this.props.data
    return (
      <li>
        <div className="list-wrapper">
          <div className="article-img-wrapper">
            <img
              src={require('../../assets/sprites.jpg')}
              alt="error"
              className="article-img"
            />
          </div>
          <div className="article-info">
            <h3 className="article-title txt-ellipsis">{data.title}</h3>
            <div className="target-article-info">
              <div>
                <NavLink
                  to={{
                    pathname: '/otherHomePage',
                    search: '?userId=5d0059ff8377ac630c93a4f5'
                  }}
                >
                  <span className="iconfont iconzuozhe" />
                  <span className="p-5 txt-ellipsis" title={data.author}>
                    {data.author}
                  </span>
                </NavLink>
              </div>
              {/* <div>
                <span className="iconfont iconhuabanfuben" />
                <span className="p-5 txt-ellipsis" title={data.favor}>
                  {data.favor}
                </span>
              </div> */}
              <div>
                <span className="iconfont iconyanjing1" />
                <span className="p-5 txt-ellipsis" title={data.viewerCount}>
                  {data.viewerCount}
                </span>
              </div>
              <div>
                <span className="iconfont iconshijian" />
                <span className="p-5 txt-ellipsis" title={data.publishTime}>
                  {data.publishTime}
                </span>
              </div>
              <div>
                <span className="iconfont iconduomeitiicon" />
                <span className="p-5 txt-ellipsis" title={data.articleType}>
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

export default ArticleListItem
