import './myBlog.less'
import React, { Component } from 'react'
import CommonHeader from '@/components/CommonHeader/CommonHeader'
import { Button } from 'antd'
import marked from 'marked'
import hljs from 'highlight.js'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

export default class myBlog extends Component {
  constructor(props) {
    super(props)
    this.onContentChange = this.onContentChange.bind(this)
    this.selectEditor = this.selectEditor.bind(this)
    this.selectMd = this.selectMd.bind(this)
    this.state = {
      articleDetail: {
        content: ''
      },
      previewContent: '',
      editorState: BraftEditor.createEditorState(null),
      isEditor: true
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
  async componentDidMount() {
    // 假设此处从服务端获取html格式的编辑器内容
    // const htmlContent = await fetchEditorContent()
    // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
    // this.setState({
    //   editorState: BraftEditor.createEditorState(htmlContent)
    // })
  }

  submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = this.state.editorState.toHTML()
    // const result = await saveEditorContent(htmlContent)
  }

  handleEditorChange = editorState => {
    this.setState({ editorState })
  }
  onContentChange(e) {
    this.setState({
      previewContent: marked(e.target.innerText, { breaks: true })
    })
  }
  selectEditor() {
    this.setState({
      isEditor: true
    })
    console.log(this.state.isEditor)
  }
  selectMd() {
    this.setState({
      isEditor: false
    })
    console.log(this.state.isEditor)
  }
  render() {
    const { editorState } = this.state
    return (
      <div className="publish-blog">
        <CommonHeader />
        <div className="content-wrapper">
          <div>
            <Button onClick={this.selectEditor}>富文本编辑</Button>

            <Button onClick={this.selectMd}>md</Button>
          </div>
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
          {/* 富文本编辑器 */}
          <div className="my-component">
            <BraftEditor
              value={editorState}
              onChange={this.handleEditorChange.bind(this)}
              onSave={this.submitContent.bind(this)}
            />
          </div>
          <Button className="refer-btn" type="primary">
            发布
          </Button>
        </div>
      </div>
    )
  }
}
