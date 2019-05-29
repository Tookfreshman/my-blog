import './RightSideBar.less'
import React, { Component } from 'react'
import CountingBar from './CountingBar'

class RightSideBar extends Component {
  render() {
    return (
      <div className="right-side-content">
        <div className="website-info">
          <CountingBar />
        </div>
      </div>
    )
  }
}

export default RightSideBar
