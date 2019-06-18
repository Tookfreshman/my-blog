import './Editor.less'
import React, { Component } from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

class Editor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: BraftEditor.createEditorState(null)
    }
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
    console.log(htmlContent)
    // const result = await saveEditorContent(htmlContent)
  }
  handleEditorChange = editorState => {
    this.setState({ editorState })
    this.props.pfn(editorState.toHTML())
  }
  render() {
    const { editorState } = this.state
    return (
      <div className="editor-wrapper">
        <BraftEditor
          value={editorState}
          onBlur={this.handleEditorChange.bind(this)}
          onSave={this.submitContent.bind(this)}
          placeholder="请输入正文"
        />
      </div>
    )
  }
}

export default Editor
