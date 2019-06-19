import axios from './api'
const ART = '/articles'

// 发布博客  /source-open/getRecentlyBlogs
export const publishBlog = params => axios.post(`${ART}/publishBlog`, params)

// 查询最新的10条博客
export const getRecentlyBlogs = params =>
  axios.get(`${ART}/source-open/getRecentlyBlogs`, params)
