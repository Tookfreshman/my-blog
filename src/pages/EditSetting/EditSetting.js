import './EditSetting.less'
import React, { Component } from 'react'
import WrappedSettingForm from '@/components/WrappedSettingForm/WrappedSettingForm'

class EditSetting extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="edit-setting">
        <WrappedSettingForm />
      </div>
    )
  }
}

export default EditSetting
