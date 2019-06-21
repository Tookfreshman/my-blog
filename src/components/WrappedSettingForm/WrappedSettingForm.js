import './WrappedSettingForm.less'
import React, { Component } from 'react'
import {
  Form,
  DatePicker,
  Select,
  Input,
  Button,
  Icon,
  Upload,
  Modal,
  Cascader,
  message
} from 'antd'
import { NavLink, withRouter } from 'react-router-dom'
import COS from 'cos-js-sdk-v5'
import { uploadUserSetting } from '@/api/uploadController'
import { getAllIndustrys, getAllProvinceAndCitys } from '@/api/configController'
import { getUserBrief, nickNameIsExistence } from '@/api/userController'
import { connect } from 'react-redux'
import getUrlParam from '@/utils/getUrlParam'
import moment from 'moment'
const { Option } = Select

class SettingForm extends Component {
  constructor(props) {
    super(props)
    this.submitForm = this.submitForm.bind(this)
    this.handlePreview = this.handlePreview.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.uploadImg = this.uploadImg.bind(this)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      fileData: {
        portraitUrl: '',
        portraitName: ''
      },
      industryList: [],
      options: [],
      userBrief: {},
      showBackButton: true,
      nickNameDisabled: false
    }
  }

  canUse() {
    const nickName = this.props.form.getFieldValue('nickName')
    if (!nickName) {
      return
    }
    const isError = this.props.form.getFieldError('nickName') ? true : false
    if (isError) {
      return
    }
    nickNameIsExistence({ nickName })
      .then(res => {
        if (res.code === '0') {
        } else if (res.code === '-1') {
          this.props.form.setFields({
            nickName: {
              value: nickName,
              errors: [new Error(res.msg)]
            }
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentDidMount() {
    this.queryAllIndustrys()
    this.queryAllProvinceAndCitys()
    this.queryUserBrief()
    this.backCanShow()
    this.messageAlert()
  }

  messageAlert() {
    let modify = getUrlParam('modify')
    if (!modify) {
      message.info('需要先完善信息')
    }
  }

  queryAllIndustrys() {
    getAllIndustrys()
      .then(res => {
        if (res.code === '0') {
          this.setState({
            industryList: res.data
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  backCanShow() {
    let modify = getUrlParam('modify')
    if (!modify) {
      this.setState({
        showBackButton: false
      })
    }
  }

  saveAndBack() {
    let modify = getUrlParam('modify')
    if (!modify) {
      message.success('保存成功')
      this.props.history.push('/home')
    } else {
      message.success('修改成功')
      this.props.history.push('/setting/view')
    }
  }

  queryAllProvinceAndCitys() {
    getAllProvinceAndCitys()
      .then(res => {
        if (res.code === '0') {
          this.setState({
            options: res.data
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  queryUserBrief() {
    getUserBrief()
      .then(res => {
        if (res.code === '0') {
          let fileList
          if (res.data.portraitName && res.data.portraitUrl) {
            fileList = [
              {
                uid: '-1',
                name: res.data.portraitName,
                status: 'done',
                url: res.data.portraitUrl
              }
            ]
          } else {
            fileList = []
          }
          if (res.data.nickName) {
            this.setState({
              nickNameDisabled: true
            })
          }
          this.setState({
            userBrief: res.data,
            fileList: fileList,
            previewImage: res.data.portraitUrl
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  submitForm() {
    if (!this.props.isLogin) {
      message.error('未登录')
      return
    }
    const form = this.props.form
    const isError = form.getFieldError('nickName') ? true : false
    if (isError) {
      return
    }
    form.validateFields(err => {
      if (!err) {
        const fileData = this.state.fileData
        const userId = this.props.userInfo.userId
        const bornDate = form.getFieldValue('bornDate')
          ? form.getFieldValue('bornDate').format('YYYY-MM-DD')
          : ''
        const region = form.getFieldValue('region')
          ? form.getFieldValue('region').join('-')
          : ''
        const params = {
          ...form.getFieldsValue(),
          region,
          bornDate,
          ...fileData,
          userId
        }
        if (this.state.nickNameDisabled) {
          params.isNew = false
        } else {
          params.isNew = true
        }
        this.props.setFlag()
        uploadUserSetting(params)
          .then(res => {
            if (res.code === '0') {
              this.saveAndBack()
            } else {
              message.error(res.msg)
            }
            this.props.removeFlag()
          })
          .catch(error => {
            this.props.removeFlag()
            console.log(error)
          })
      } else {
        return false
      }
    })
  }

  handlePreview() {
    this.setState({ previewVisible: true })
  }

  handleCancel() {
    this.setState({ previewVisible: false })
  }

  handleRemove() {
    this.setState({
      fileList: [],
      fileData: {
        portraitUrl: '',
        portraitName: ''
      }
    })
  }

  uploadImg(file) {
    var cos = new COS({
      SecretId: 'AKIDTijV3ReTQ8anlEnQ7cw0oPlds8BA5c6P',
      SecretKey: 'EE4SdaHjywiJgsqZ1IJ6h3B2i9NK1ZzB'
    })
    let userId = this.props.userInfo.userId
    let obj = {
      Bucket: 'my-blog-1259093317',
      Region: 'ap-chengdu',
      Key: 'blog-user-portrait/' + userId + '/' + file.file.name,
      Body: file.file
    }
    cos.putObject(obj, (err, data) => {
      if (data.statusCode === 200) {
        let portraitUrl =
          'https://my-blog-1259093317.cos.ap-chengdu.myqcloud.com/' + obj.Key
        let portraitName = file.file.name
        let params = {
          portraitUrl,
          portraitName
        }
        this.setState({
          previewImage: portraitUrl,
          fileList: [
            {
              uid: '-1',
              name: file.file.name,
              status: 'done',
              url: portraitUrl
            }
          ],
          fileData: params
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const FormItem = Form.Item
    const TextArea = Input.TextArea
    const { userBrief, showBackButton, nickNameDisabled } = this.state
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 22 }
      }
    }
    const { fileList, previewVisible, previewImage } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const industryList = this.state.industryList.map(item => (
      <Option value={item.codenamecn} key={item.codeid}>
        {item.codenamecn}
      </Option>
    ))
    const options = this.state.options
    return (
      <Form {...formItemLayout} layout="horizontal">
        <FormItem label="头像">
          <Upload
            listType="picture-card"
            fileList={fileList}
            customRequest={this.uploadImg}
            onPreview={this.handlePreview}
            onRemove={this.handleRemove}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal
            visible={previewVisible}
            footer={null}
            onCancel={this.handleCancel}
            wrapClassName="portrait-preview"
          >
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </FormItem>
        <FormItem label="昵称：" extra="昵称一旦保存，无法再进行修改">
          {getFieldDecorator('nickName', {
            rules: [{ required: true, message: '请输入昵称' }],
            initialValue: userBrief.nickName
          })(
            <Input
              suffix={
                <span
                  className="iconfont iconnicheng"
                  style={{ color: '#ccc' }}
                />
              }
              style={{ width: 200 }}
              type="text"
              placeholder="昵称"
              autoComplete="off"
              autoFocus
              onBlur={() => this.canUse()}
              disabled={nickNameDisabled ? true : false}
            />
          )}
        </FormItem>
        <FormItem label="生日：">
          {getFieldDecorator('bornDate', {
            initialValue: userBrief.bornDate ? moment(userBrief.bornDate) : null
          })(
            <DatePicker
              suffixIcon={
                <span
                  className="iconfont iconshengri"
                  style={{ color: '#ccc' }}
                />
              }
              format="YYYY-MM-DD"
              placeholder="生日"
              style={{ width: 200 }}
            />
          )}
        </FormItem>
        <FormItem label="性别：">
          {getFieldDecorator('sex', {
            initialValue: userBrief.sex ? userBrief.sex : undefined
          })(
            <Select
              suffixIcon={
                <span
                  className="iconfont iconxingbie"
                  style={{ color: '#ccc' }}
                />
              }
              placeholder="性别"
              style={{ width: 200 }}
            >
              <Option value={1}>男</Option>
              <Option value={2}>女</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="地址：">
          {getFieldDecorator('region', {
            initialValue: userBrief.region ? userBrief.region.split('-') : []
          })(
            <Cascader
              suffixIcon={
                <span className="iconfont icondiqu" style={{ color: '#ccc' }} />
              }
              fieldNames={{
                label: 'label',
                value: 'label',
                children: 'children'
              }}
              options={options}
              changeOnSelect
              placeholder="地址"
              style={{ width: 200 }}
            />
          )}
        </FormItem>
        <FormItem label="行业：">
          {getFieldDecorator('industry', {
            rules: [{ required: true, message: '请选择行业' }],
            initialValue: userBrief.industry ? userBrief.industry : undefined
          })(
            <Select
              suffixIcon={
                <span
                  className="iconfont iconhangye"
                  style={{ color: '#ccc' }}
                />
              }
              placeholder="行业"
              style={{ width: 200 }}
            >
              {industryList}
            </Select>
          )}
        </FormItem>
        <FormItem label="简介：">
          {getFieldDecorator('brief', { initialValue: userBrief.brief })(
            <TextArea placeholder="简介" style={{ width: 500, height: 150 }} />
          )}
        </FormItem>
        <FormItem style={{ marginLeft: 80 }}>
          <Button type="primary" onClick={() => this.submitForm()}>
            确定
          </Button>
          <NavLink to="/setting/view">
            <Button
              style={{
                marginLeft: 30,
                display: showBackButton ? 'inline' : 'none'
              }}
            >
              返回
            </Button>
          </NavLink>
        </FormItem>
      </Form>
    )
  }
}
const WrappedSettingForm = Form.create({ name: 'horizontal_setting' })(
  SettingForm
)

const mapStateToProps = state => {
  return { userInfo: state.userInfo, isLogin: state.isLogin }
}

const mapDispatchToProps = dispatch => {
  return {
    setFlag: () => {
      dispatch({
        type: 'SET_FLAG'
      })
    },
    removeFlag: () => {
      dispatch({
        type: 'REMOVE_FLAG'
      })
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WrappedSettingForm)
)
