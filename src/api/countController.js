import axios from './api'
const COUNT = '/count'

export const getAllUserCount = params =>
  axios.get(`${COUNT}/source-open/getAllUserCount`, params)