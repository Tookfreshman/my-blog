import './MiddlePage.less'
import React, { Component } from 'react'
import Loading from '@/components/Loading/Loading'
import { withRouter } from 'react-router'
import getUrlParam from '@/utils/getUrlParam'

class MiddlePage extends Component {
  componentDidMount() {
    const path = getUrlParam('path')
    this.props.history.push(path)
  }

  render() {
    return <Loading />
  }
}

export default withRouter(MiddlePage)
