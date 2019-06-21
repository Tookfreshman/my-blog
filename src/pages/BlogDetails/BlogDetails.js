import './BlogDetails.less'
import React, { Component } from 'react'
import Md from '@/components/Md/Md'
import { queryBlogsById } from '@/api/articles'
import getMKTitles from '@/components/Md/getMdTitles'
import getUrlParam from '@/utils/getUrlParam'
import md5 from 'js-md5'

class BlogDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      article: null,
      MKTitles: {
        nav: [
          {
            title: '',
            children: []
          }
        ]
      },
      curTab: '',
      isFirst: true
    }
    this.generateMenu = this.generateMenu.bind(this)
    this.scrollToAnchor = this.scrollToAnchor.bind(this)
  }
  componentDidMount() {
    this.getBlogById()
  }
  getBlogById() {
    queryBlogsById({
      id: getUrlParam('id')
    })
      .then(res => {
        if (res.code === '0') {
          this.setState({
            article: res.data,
            MKTitles: getMKTitles(res.data.article)
          })
        } else {
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
  scrollToAnchor = (anchorName, index) => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName)
      if (index === 0) {
        this.setState({
          isFirst: true
        })
      } else {
        this.setState({
          isFirst: false
        })
      }
      if (anchorElement) {
        this.setState({
          curTab: anchorName
        })
        let scrollHeight = anchorElement.offsetTop
        window.scrollTo(0, scrollHeight)
        // anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' })
      }
    }
  }
  generateMenu(menuObj) {
    let vdom = []
    if (menuObj instanceof Array) {
      let list = []
      for (let item of menuObj) {
        list.push(this.generateMenu(item))
      }
      vdom.push(
        <ul className="nav-list" key="single">
          {list}
        </ul>
      )
    } else {
      let title
      if (menuObj.title) {
        menuObj.title = menuObj.title.trim()
        title = md5(menuObj.title)
      }
      vdom.push(
        <li key="key" className="list-item">
          <span
            className={`${
              this.state.isFirst && menuObj.index === 0
                ? 'anchor-active'
                : this.state.curTab === title
                ? 'anchor-active'
                : ''
            }`}
            onClick={() => this.scrollToAnchor(title, menuObj.index)}
          >
            {menuObj.title}
          </span>
          {this.generateMenu(menuObj.children)}
        </li>
      )
    }
    return vdom
  }
  render() {
    let titles = this.state.MKTitles.nav
    if (this.state.MKTitles.nav.length > 1) {
      console.log(this.state.MKTitles.nav)
    }
    return (
      <div className="details-wrapper">
        <Md article={this.state.article} />
        <div className="aside-nav">{this.generateMenu(titles)}</div>
      </div>
    )
  }
}

export default BlogDetails
