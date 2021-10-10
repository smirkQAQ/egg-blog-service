'use strict';

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

module.exports = {
  // token颁发 expires：ms, 到期时间 不传默认一天
  getToken(data, expires = 7200) {
    return jwt.sign({
      ...data,
      exp: Math.floor(Date.now() / 1000) + expires,
    }, '9527');
  },
  // 转换int类型
  toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
  },
  // md5加密
  cryptPwd(password) {
    const md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
  },
  // 生成6位随机数
  randomFns() {
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += parseInt(Math.random() * 10);
    }
    return code;
  },
};
