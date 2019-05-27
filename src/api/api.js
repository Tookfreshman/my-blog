import axios from 'axios'
import qs from 'qs'
let baseURL = '/api'

if (process.env.NODE_ENV === 'development') {
  // 开发环境api接口
  baseURL = '/'
} else if (process.env.NODE_ENV === 'test') {
  // 测试环境api接口
  baseURL = 'https://api-test.ca-b2b.com'
} else {
  // 线上环境api接口
  baseURL = 'https://gateway.ca-b2b.com'
}
axios.defaults.baseURL = baseURL
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.withCredentials = true
// 测试

axios.interceptors.request.use(
  function(request) {
    return request
  },
  function(error) {
    // 请求错误时做些事
    return Promise.reject(error)
  }
)
// 添加一个响应拦截器
axios.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    let response = error.response
    return Promise.reject(response)
  }
)

// 自定义判断元素类型JS
function toType(obj) {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase()
}

// 参数过滤函数
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

//isFormdata判断是否为Formdata
function apiAxios(method, url, params, isFormdata, headers, timeout) {
  if (params) {
    params = filterNull(params)
  }
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url:
        method === 'GET'
          ? url.indexOf('?') > -1
            ? url + '&time=' + new Date().getTime()
            : url + '?time=' + new Date().getTime()
          : url,
      data:
        method === 'POST' ||
        method === 'PUT' ||
        method === 'DELETE' ||
        method === 'PATCH'
          ? isFormdata
            ? qs.stringify(params)
            : params
          : null,
      params:
        method === 'GET' || method === 'DELETE'
          ? isFormdata
            ? params
            : params
          : null,
      baseURL: baseURL,
      timeout: timeout && timeout.timeout ? timeout.timeout : 6000,
      headers: headers
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        if (err) {
          reject(err.data)
        }
      })
  })
}

/**
 *  get post put delete请求方法
 * @param url
 * @param params
 * @param data
 * @returns {Promise}
 */
export default {
  get: function(url, params = {}, isFormdata, headers, timeout) {
    return apiAxios('GET', url, params, isFormdata, headers, timeout)
  },
  post: function(url, data = {}, isFormdata, headers = {}, timeout) {
    return apiAxios('POST', url, data, isFormdata, headers, timeout)
  },
  put: function(url, data = {}, isFormdata, timeout) {
    return apiAxios('PUT', url, data, isFormdata, {}, timeout)
  },
  delete: function(url, data = {}, isFormdata, headers = {}, timeout) {
    return apiAxios('DELETE', url, data, isFormdata, headers, timeout)
  },
  patch: function(url, data = {}, isFormdata, headers = {}, timeout) {
    return apiAxios('PATCH', url, data, isFormdata, headers, timeout)
  }
}
