import './RightSideBar.less'
import React, { Component } from 'react'
import CountingBar from '@/components/CountingBar/CountingBar'
import { getAllUserCount, getViewerCount } from '@/api/countController'

class RightSideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allUserCount: 0,
      allViewerCount: 0
    }
  }

  componentWillMount() {
    getViewerCount({})
      .then(res => {
        if (res.code === '0') {
          this.setState({
            allViewerCount: res.data
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
    getAllUserCount({})
      .then(res => {
        if (res.code === '0') {
          this.setState({
            allUserCount: res.data
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const allUserCount = this.state.allUserCount
    const allViewerCount = this.state.allViewerCount
    const data = [
      { name: '总用户', val: allUserCount },
      { name: '总文章', val: '123213' },
      { name: '浏览量', val: allViewerCount }
    ]
    return (
      <div className="right-side-content">
        <CountingBar data={data} />
      </div>
    )
  }
}

export default RightSideBar
