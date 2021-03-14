/*
 * @ Author: LC
 * @ Date: 2021-03-14
 * @ Description: 用户相关
 */

const mongoose = require('mongoose');
const md5 = require('md5');
// const UserModel = mongoose.model('User');
// const ArticleModel = mongoose.model('Article');

class UserController {
  // 用户登陆
  static async login(ctx) {
    ctx.body = 'login test'
  }
}

module.exports = UserController;