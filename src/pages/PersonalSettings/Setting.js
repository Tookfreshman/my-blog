import './Setting.less'
import React, { Component } from 'react'
import SettingView from '@/components/SettingView/SettingView'
import { Route, Switch } from 'react-router-dom'
import SettingMenu from '@/components/SettingMenu/SettingMenu'
import Focus from '@/pages/PersonalSettings/Focus/Focus'

class Setting extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="setting">
        <div className="setting-menu-wrapper">
          <SettingMenu />
        </div>
        <div className="setting-main-port">
          <Switch>
            <Route path="/setting/view" component={SettingView} />
            <Route path="/setting/focus" component={Focus} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default Setting
