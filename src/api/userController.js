import axios from './api'

const UP = '/user-provider'

// 查询用户是否被注册
export const userNameIsExistence = params =>
  axios.get(`${UP}/source-open/userNameIsExistence`, params)

// 注册账号
export const register = params =>
  axios.post(`${UP}/source-open/register`, params)

// 登录
export const login = params => axios.post(`${UP}/source-open/login`, params)

// 登出
export const logout = params => axios.post(`${UP}/source-open/logout`, params)

// 获取当前登录用户
export const getCurrentUser = params =>
  axios.get(`${UP}/getCurrentUser`, params)

// 获取当前用户个人资料设置
export const getUserBrief = params => axios.get(`${UP}/getUserBrief`, params)

// 根据userId查询用户的信息
// 获取当前用户个人资料设置
export const getUserBriefByUserId = params =>
  axios.get(`${UP}/source-open/getUserBriefByUserId`, params)

// 关注某个用户
export const focusSomeone = params => axios.patch(`${UP}/focusSomeone`, params)

// 取消关注某个用户
export const unfocusSomeone = params =>
  axios.patch(`${UP}/unfocusSomeone`, params)

// 查询是否关注某个用户
export const isFocusSomeone = params =>
  axios.get(`${UP}/isFocusSomeone`, params)

// 根据userId查询当前用户的粉丝和关注的人
export const findFansAndFocusByuserId = params =>
  axios.get(`${UP}/source-open/findFansAndFocusByuserId`, params)

// 查询昵称是否可用
export const nickNameIsExistence = params =>
  axios.get(`${UP}/source-open/nickNameIsExistence`, params)
