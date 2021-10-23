'use strict';

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

module.exports = {
  /**
   * token颁发
   * @param {object} data -需要加密的对象及属性
   * @param {int} expires -到期时间，不传默认一天
   * @return {string} -token
   * @2021/10/23 18:20
   */
  getToken(data, expires = 7200) {
    return jwt.sign({
      ...data,
      exp: Math.floor(Date.now() / 1000) + expires,
    }, '9527');
  },

  /**
   * 转换int类型
   * @param {object} str -字符串
   * @return {object} -返回整形
   * @date 2021/10/22 18:45
   */
  toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
  },
  /**
   * MD5加密 密码
   * @param {string} pw -明文密码
   * @return {string} -加密密码
   * @2021/10/23 18:12
   */
  cryptPwd(pw) {
    const md5 = crypto.createHash('md5');
    return md5.update(pw).digest('hex');
  },
  /**
   * 随机生成六位数
   * @return {string} -code
   * @2021/10/23 18:16
   */
  randomFns() {
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += parseInt(Math.random() * 10);
    }
    return code;
  },
};
