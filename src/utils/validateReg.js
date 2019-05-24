// 6-20位同时包含英文和数字的账号
export function isValidUserName(str) {
  const reg = /(?=.*[\d])(?=.*[a-zA-Z])^[a-zA-Z]{1}[0-9A-Za-z_]{5,19}$/
  return reg.test(str)
}

// 注册密码验证
export function isValidPassword(str) {
  const reg = /^(?!([\d]+|[a-zA-Z]+|[\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]+)$)[\w\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]{6,20}$/
  return reg.test(str)
}
