import './Md.less'
import React, { Component } from 'react'
import marked from 'marked'
import hljs from 'highlight.js'

export default class Md extends Component {
  constructor(props) {
    super(props)
    this.onContentChange = this.onContentChange.bind(this)
    this.state = {
      articleDetail: {
        content: ''
      },
      previewContent: ''
    }
  }
  componentWillMount() {
    // marked相关配置
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
      highlight: function(code) {
        return hljs.highlightAuto(code).value
      }
    })
  }

  onContentChange(e) {
    this.setState({
      previewContent: marked(e.target.innerText, { breaks: true })
    })
  }
  render() {
    return (
      <div className="md-wrapper">
        <div
          className="edit-content"
          contentEditable="plaintext-only"
          onInput={this.onContentChange}
        />
        <div
          className="article-detail"
          id="content"
          dangerouslySetInnerHTML={{
            __html: this.state.previewContent
          }}
        />
      </div>
    )
  }
}
