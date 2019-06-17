import axios from './api'
const COUNT = '/count'

// 获取用户数量
export const getAllUserCount = params =>
  axios.get(`${COUNT}/source-open/getAllUserCount`, params)

// 查看网站访问量
export const getViewerCount = params =>
  axios.get(`${COUNT}/source-open/getViewerCount`, params)

// 更新网站访问量
export const updateViewerCount = params =>
  axios.post(`${COUNT}/source-open/updateViewerCount`, params)
