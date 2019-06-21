import './RightSideBar.less'
import React, { Component } from 'react'
import CountingBar from '@/components/CountingBar/CountingBar'
import {
  getAllUserCount,
  getViewerCount,
  getBlogsCount
} from '@/api/countController'

class RightSideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allUserCount: 0,
      allViewerCount: 0,
      allBlogsCount: 0
    }
  }

  componentWillMount() {
    this.queryViewerCount()
    this.queryAllUserCount()
    this.queryBlogsCount()
  }

  queryViewerCount() {
    getViewerCount()
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
  }

  queryAllUserCount() {
    getAllUserCount()
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

  queryBlogsCount() {
    getBlogsCount()
      .then(res => {
        if (res.code === '0') {
          this.setState({
            allBlogsCount: res.data
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { allUserCount, allViewerCount, allBlogsCount } = this.state
    const data = [
      { name: '总用户', val: allUserCount },
      { name: '总文章', val: allBlogsCount },
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
