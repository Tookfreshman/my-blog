/**
 *
 * md5二次加密
 * @param {*} md5Str
 * @returns
 */
function md5EncryptAgain(md5Str) {
  // from和to为交换的位置，不为index，如4为第四位
  const rule = [
    {
      from: 4,
      to: 22
    },
    {
      from: 3,
      to: 28
    },
    {
      from: 30,
      to: 11
    },
    {
      from: 8,
      to: 27
    },
    {
      from: 29,
      to: 7
    }
  ]

  const pt = randNum(0, 5)
  const char1 = md5Str[rule[pt].to - 1]
  const char2 = md5Str[rule[pt].from - 1]

  md5Str = replaceStr(md5Str, char1, rule[pt].from)
  md5Str = replaceStr(md5Str, char2, rule[pt].to)

  return {
    md5Str: md5Str,
    pt: pt + GenNonDuplicateID()
  }
}

// 替换第index位的字符，
function replaceStr(str, char, index) {
  return str.substr(0, index - 1) + char + str.substr(index, str.length)
}

/**
 *  生成一个minnum - maxnum-1的随机整数
 * @param {*} minnum Number
 * @param {*} maxnum Number
 */
function randNum(minnum, maxnum) {
  return Math.floor(minnum + Math.random() * (maxnum - minnum))
}

/**
 *  生成一个指定长度的随机Token
 * @param {*} randomLength Number Token产长度
 */
export function GenNonDuplicateID(randomLength = 10) {
  return Number(
    Math.random()
      .toString()
      .substr(3, randomLength) + Date.now()
  ).toString(36)
}

export default md5EncryptAgain
