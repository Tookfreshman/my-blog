import './Publish.less'
import React, { Component } from 'react'
import WrappedBlogForm from '@/components/WrappedBlogForm/WrappedBlogForm'

export default class Publish extends Component {
  render() {
    return (
      <div className="publish-blog">
        <WrappedBlogForm />
      </div>
    )
  }
}
