import axios from './api'
const AP = '/authentication-provider'

// 获取当前登录用户的认证状态
export const getAuthentication = params =>
  axios.get(`${AP}/getAuthentication`, params)
