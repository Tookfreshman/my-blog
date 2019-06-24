import './Md.less'
import './marked.less'
import React, { Component } from 'react'
import marked from 'marked'
import hljs from 'highlight.js'
// import 'highlight.js/styles/github.css'
import md5 from 'js-md5'

export default class Md extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articleDetail: {
        article: '',
        articleType: '',
        author: '',
        desc: '',
        publishTime: '',
        title: ''
      },
      previewContent: '',
      titleNav: [],
      rendererMD: null
    }
  }
  componentWillMount() {
    let rendererMD = new marked.Renderer()
    let nav = []
    // marked相关配置
    marked.setOptions({
      renderer: rendererMD,
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
      highlight: code => {
        return hljs.highlightAuto(code).value
      }
    })
    rendererMD.heading = (text, level) => {
      let escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')
      // nav.push(text)
      let title = md5(text)
      return `<h${level} id='${title}'><a name="${escapedText}" class="anchor" href="#${title}"><span class="header-link"></span></a>${text}</h${level}>`
    }
    this.setState({
      rendererMD: rendererMD,
      titleNav: nav
    })
  }
  componentWillReceiveProps = nextProps => {
    if (nextProps.article) {
      let art = nextProps.article.article
      this.setState({
        articleDetail: nextProps.article,
        previewContent: marked(art, {
          renderer: this.state.rendererMD
        })
      })
    }
  }
  render() {
    const state = this.state
    return (
      <div className="md-wrapper">
        <div className="article-desc">
          <h1 className="article-title">{state.articleDetail.title}</h1>
          <p className="sketch">
            <strong>简述：{state.articleDetail.desc}</strong>
          </p>
          <p className="author">
            <strong>作者：{state.articleDetail.author}</strong>
          </p>
        </div>
        <div
          className="article-detail markdown-body"
          id="content"
          dangerouslySetInnerHTML={{
            __html: this.state.previewContent
          }}
        />
      </div>
    )
  }
}
