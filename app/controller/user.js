'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    // const { ctx } = this;
  }
  async register() {
    const { ctx } = this;
    ctx.validate({
      email: 'email',
      password: { type: 'password' },
    });
    const findUserResult = await ctx.service.user.findUser(ctx.request.body);
    if (findUserResult) {
      ctx.body = {
        code: 200,
        data: '邮箱已被注册',
      };
    } else {
      await ctx.service.user.register(ctx.request.body);
      ctx.body = {
        code: 200,
        data: '注册成功',
      };
    }
  }
}

module.exports = UserController;
