import axios from './api'

const UP = '/user-provider'

// 查询用户是否被注册
export const userInfoIsExistence = params =>
  axios.get(`${UP}/source-open/userInfoIsExistence`, params)

// 注册账号
export const register = params =>
  axios.post(`${UP}/source-open/register`, params)

// 登录
export const login = params => axios.post(`${UP}/source-open/login`, params)

// 登出
export const logout = params => axios.post(`${UP}/source-open/logout`, params)

// 获取当前登录用户
export const getCurrentUser = params =>
  axios.get(`${UP}/source-open/getCurrentUser`, params)
