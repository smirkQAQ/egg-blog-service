'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.validate({
      test: { type: 'string?', required: true },
    });
    ctx.body = ctx.params;
  }
}

module.exports = UserController;
