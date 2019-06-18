import axios from './api'
const CP = '/config-provider'

// 获取行业数据
export const getAllIndustrys = params =>
  axios.get(`${CP}/source-open/getAllIndustrys`, params)

// 获得中国所有省市区信息
export const getAllProvinceAndCitys = params =>
  axios.get(`${CP}/source-open/getAllProvinceAndCitys`, params)
