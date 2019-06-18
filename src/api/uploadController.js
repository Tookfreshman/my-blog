import axios from './api'
const UP = '/upload-provider'

// 存储用户信息设置
export const uploadUserSetting = params =>
  axios.post(`${UP}/uploadUserSetting`, params)
