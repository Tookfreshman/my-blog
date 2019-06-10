import './myBlog.less'
import React, { Component } from 'react'
import Editor from './components/Editor'
import { Button, Input, Select } from 'antd'

export default class myBlog extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    // this.referContent = this.referContent.bind(this)
    this.state = {
      title: '',
      articleType: '',
      article: '',
      isEditor: true
    }
  }
  handleChange(value) {
    this.setState({ articleType: value })
  }
  handleTitle(e) {
    this.setState({ title: e.target.value })
  }
  fn(data) {
    this.setState({ article: data }, () => {
      console.log(this.state.article)
    })
  }
  referContent() {
    console.log(this.state.title)
  }
  render() {
    const { Option } = Select
    const state = this.state
    return (
      <div className="publish-blog">
        <div className="content-wrapper">
          <div className="elevant-contents">
            <Input
              className="art-title"
              value={state.title}
              onChange={this.handleTitle.bind(this)}
              placeholder="请输入标题"
            />
            <Select
              className="select-selection"
              placeholder="请选择博文类型"
              style={{ width: 200 }}
              onChange={this.handleChange}
            >
              <Option value="1">技术类</Option>
              <Option value="2">个人日记</Option>
            </Select>
          </div>
          <Editor pfn={this.fn.bind(this)} />
          <Button
            className="refer-btn"
            type="primary"
            onClick={this.referContent.bind(this)}
          >
            发博文
          </Button>
        </div>
      </div>
    )
  }
}
