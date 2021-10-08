'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    // const { ctx } = this;
  }
  async register() {
    const { ctx, app } = this;
    await app.redis.set('corpiduserid', 'token asdhaskdhaskjdh', 'ex', 7200); // 保存到redis
    ctx.body = {
      code: 200,
      data: {
        email: ctx.request.body.email,
      },
    };
  }
}

module.exports = UserController;
