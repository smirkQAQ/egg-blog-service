/*
 * @Author: LC
 * @Date: 2021-10-11
 * @Description:
 */

'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  async articles() {
    const { ctx } = this;
    ctx.validate({
      page: { type: 'string' },
      pageSize: { type: 'string' },
      category: { type: 'string', allowEmpty: true, required: false },
      tag: { type: 'string', allowEmpty: true, required: false },
    }, ctx.query);
    const articles = await ctx.service.article.articles(ctx.query);
    ctx.body = {
      code: 200,
      data: {
        list: articles.articles,
      },
      count: articles.count,
      msg: 'Success',
    };
  }
}

module.exports = ArticleController;
