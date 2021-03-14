/*
 * @ Author: LC
 * @ Date: 2021-03-14
 * @ Description: 用户相关和接口逻辑
 */

const mongoose = require('mongoose');
const md5 = require('md5');
// const UserModel = mongoose.model('User');
// const ArticleModel = mongoose.model('Article');

class UserController {
  // 用户登陆
  static async login(ctx) {
    ctx.success({ msg: '登录成功' });
  }
}

module.exports = UserController;