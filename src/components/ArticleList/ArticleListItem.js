import './ArticleList.less'
import React, { Component } from 'react'

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
                <span className="iconfont iconzuozhe" />
                <span className="p-5 txt-ellipsis" title={data.author}>
                  {data.author}
                </span>
              </div>
              <div>
                <span className="iconfont iconhuabanfuben" />
                <span className="p-5 txt-ellipsis" title={data.favor}>
                  {data.favor}
                </span>
              </div>
              <div>
                <span className="iconfont iconyanjing1" />
                <span className="p-5 txt-ellipsis" title={data.views}>
                  {data.views}
                </span>
              </div>
              <div>
                <span className="iconfont iconshijian" />
                <span className="p-5 txt-ellipsis" title={data.createTime}>
                  {data.createTime}
                </span>
              </div>
              <div>
                <span className="iconfont iconduomeitiicon" />
                <span className="p-5 txt-ellipsis" title={data.createTime}>
                  {data.type.join(',')}
                </span>
              </div>
            </div>
            <p className="article-brief">{data.content}</p>
          </div>
        </div>
      </li>
    )
  }
}

export default ArticleListItem
