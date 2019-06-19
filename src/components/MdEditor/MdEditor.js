import './MdEditor.less'
import React, { Component } from 'react'
import Editor from 'for-editor'

class MdEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleChange(value) {
    this.setState({
      value
    })
    this.props.onMdChange(value)
  }

  render() {
    const { value } = this.state
    return <Editor value={value} onChange={this.handleChange.bind(this)} />
  }
}

export default MdEditor
