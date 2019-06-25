import './WrappedBlogForm.less'
import React, { Component } from 'react'
import {
  Form,
  Select,
  Input,
  Button,
  message,
  Row,
  Col,
  Icon,
  Upload,
  Modal
} from 'antd'
import MdEditor from '@/components/MdEditor/MdEditor'
import { publishBlog } from '@/api/articles'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import COS from 'cos-js-sdk-v5'

class BlogForm extends Component {
  constructor(props) {
    super(props)
    this.submitForm = this.submitForm.bind(this)
    this.mdChange = this.mdChange.bind(this)
    this.handlePreview = this.handlePreview.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.uploadImg = this.uploadImg.bind(this)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      fileData: {
        blogImgUrl: '',
        blogImgName: ''
      }
    }
  }

  submitForm() {
    if (!this.props.isLogin) {
      message.error('请先登录')
      return
    }
    const form = this.props.form
    form.validateFields((err, values) => {
      if (!err) {
        const { blogImgUrl, blogImgName } = this.state.fileData
        let author =
          this.props.userInfo.nickName || this.props.userInfo.userName
        let userId = this.props.userInfo.userId
        const params = {
          ...values,
          author,
          userId
        }
        if (blogImgUrl && blogImgName) {
          params.blogImgUrl = blogImgUrl
          params.blogImgName = blogImgName
        }
        publishBlog(params)
          .then(res => {
            if (res.code === '0') {
              message.success('发布成功')
              this.props.history.push('/home')
            } else {
              message.error(res.msg)
            }
          })
          .catch(error => {
            message.error(error)
            console.log(error)
          })
      } else {
        return false
      }
    })
  }

  mdChange(val) {
    const { setFieldsValue } = this.props.form
    setFieldsValue({
      article: val
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
        blogImgUrl: '',
        blogImgName: ''
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
      Key: 'blog-picture/' + userId + '/' + file.file.name,
      Body: file.file
    }
    cos.putObject(obj, (err, data) => {
      if (data.statusCode === 200) {
        let blogImgUrl =
          'https://my-blog-1259093317.cos.ap-chengdu.myqcloud.com/' + obj.Key
        let blogImgName = file.file.name
        let params = {
          blogImgUrl,
          blogImgName
        }
        this.setState({
          previewImage: blogImgUrl,
          fileList: [
            {
              uid: '-1',
              name: file.file.name,
              status: 'done',
              url: blogImgUrl
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
    const InputTextArea = Input.TextArea
    const { Option } = Select
    const { fileList, previewVisible, previewImage } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传封面</div>
      </div>
    )
    return (
      <Form layout="horizontal" className="wrapped-blog-form">
        <Row>
          <Col span={16}>
            <FormItem>
              {getFieldDecorator('title', {
                rules: [{ required: true, message: '请输入标题' }]
              })(
                <Input
                  suffix={
                    <span
                      className="iconfont iconnicheng"
                      style={{ color: '#ccc' }}
                    />
                  }
                  placeholder="请输入标题"
                  style={{ width: 800 }}
                  autoComplete="off"
                />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem>
              {getFieldDecorator('articleType', {
                rules: [{ required: true, message: '请选择文章类型' }]
              })(
                <Select
                  suffixIcon={
                    <span
                      className="iconfont iconxingbie"
                      style={{ color: '#ccc' }}
                    />
                  }
                  placeholder="请选择文章类型"
                  style={{ width: 400 }}
                >
                  <Option value={1}>技术类</Option>
                  <Option value={2}>个人日记</Option>
                  <Option value={3}>心情</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <FormItem>
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
        <FormItem>
          {getFieldDecorator('desc', {
            rules: [{ required: true, message: '请输入摘要' }]
          })(
            <InputTextArea
              placeholder="请输入摘要"
              style={{ width: 1200, height: 100 }}
              maxLength="300"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('article', {
            rules: [{ required: true, message: '请输入文章内容' }]
          })(<MdEditor onMdChange={this.mdChange} />)}
        </FormItem>
        <FormItem style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={() => this.submitForm()}>
            提交
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedBlogForm = Form.create({ name: 'horizontal_blog' })(BlogForm)

const mapStateToProps = state => {
  return { isLogin: state.isLogin, userInfo: state.userInfo }
}

export default withRouter(connect(mapStateToProps)(WrappedBlogForm))
