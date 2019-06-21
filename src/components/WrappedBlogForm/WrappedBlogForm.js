import './WrappedBlogForm.less'
import React, { Component } from 'react'
import { Form, Select, Input, Button, message, Row, Col } from 'antd'
import MdEditor from '@/components/MdEditor/MdEditor'
import { publishBlog } from '@/api/articles'
import { connect } from 'react-redux'

class BlogForm extends Component {
  constructor(props) {
    super(props)
    this.submitForm = this.submitForm.bind(this)
    this.mdChange = this.mdChange.bind(this)
  }

  submitForm() {
    if (!this.props.isLogin) {
      message.error('请先登录')
      return
    }
    const form = this.props.form
    form.validateFields((err, values) => {
      if (!err) {
        let author =
          this.props.userInfo.nickName || this.props.userInfo.userName
        const params = {
          ...values,
          author
        }
        publishBlog(params)
          .then(res => {
            if (res.code === '0') {
              message.success('发布成功')
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

  render() {
    const { getFieldDecorator } = this.props.form
    const FormItem = Form.Item
    const InputTextArea = Input.TextArea
    const { Option } = Select
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

export default connect(mapStateToProps)(WrappedBlogForm)
