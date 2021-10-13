/*
 * @Author: LC
 * @Date: 2021-10-11
 * @Description:
 */

'use strict';

const Controller = require('egg').Controller;
const { Success } = require('../lib/response_status');

class ArticleController extends Controller {
  async articles() {
    const { ctx } = this;
    ctx.validate({
      page: { type: 'int' },
      pageSize: { type: 'int' },
      category: { type: 'string', allowEmpty: true, required: false },
      tag: { type: 'string', allowEmpty: true, required: false },
    }, ctx.query);
    const { rows, count } = await ctx.service.article.articles(ctx.query);
    ctx.body = {
      code: 200,
      data: {
        list: rows,
      },
      count,
      msg: 'Success',
    };
  }

  async detail() {
    const { ctx } = this;
    ctx.validate({
      id: { type: 'id' },
    }, ctx.query);
    const [ , detail ] = await Promise.all([
      ctx.service.article.viewAddOne(ctx.query.id),
      ctx.service.article.detail(ctx.query),
    ]);
    await ctx.service.user.viewAddOne(detail.user.id);
    ctx.body = Success(detail);
  }


}

module.exports = ArticleController;
