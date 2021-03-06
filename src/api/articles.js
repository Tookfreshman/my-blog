import axios from './api'
const ART = '/articles'

// 发布博客  /source-open/getRecentlyBlogs
export const publishBlog = params => axios.post(`${ART}/publishBlog`, params)

// 查询最新的10条博客
export const getRecentlyBlogs = params =>
  axios.get(`${ART}/source-open/getRecentlyBlogs`, params)

// 根据id查询博客
export const queryBlogsById = params =>
  axios.get(`${ART}/source-open/queryBlogsById`, params)

// 根据userId查询某人所有博客
export const querySomeoneBlogsByUserId = params =>
  axios.post(`${ART}/source-open/querySomeoneBlogsByUserId`, params)

// 博客文章增加浏览量
export const addBlogsViewer = params =>
  axios.post(`${ART}/source-open/addBlogsViewer`, params)
