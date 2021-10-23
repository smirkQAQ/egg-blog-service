'use strict';

const { Controller } = require('egg');

class BaseController extends Controller {
  get user() {
    return this.ctx.locals.uid;
  }

  success(data = null, message, code = 200) {
    this.ctx.body = { code, data, message };
    this.ctx.status = code || 200;
  }

  fail(message, code = 400) {
    message && message.message === 'Validation Failed' ?
      this.ctx.body = { code, message: message.message, data: null } :
      this.ctx.body = { code, message, data: null };
    this.ctx.status = 200;
  }

  notFound(msg, code = 404) {
    msg = msg || 'not found';
    this.ctx.throw(code, msg);
  }
}

module.exports = BaseController;
