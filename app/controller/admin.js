/*
 * @Author: LC
 * @Date: 2021-10-11
 * @Description:
 */

'use strict';

const Controller = require('egg').Controller;
const { Success } = require('../lib/response_status');

class AdminController extends Controller {
  async deleteArticle() {
    const { ctx } = this;
    ctx.validate({
      id: { type: 'int' },
    });
    const { id } = ctx.request.body;
    await ctx.service.article.deleteArticle(id);
    ctx.body = Success({ id });
  }
}

module.exports = AdminController;