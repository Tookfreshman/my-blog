import axios from './api'
const ART = '/articles'

export const publishBlog = params => axios.post(`${ART}/publishBlog`, params)
