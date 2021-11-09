/*
 * @Author: LC
 * @Date: 2021-10-11
 * @Description:
 */

'use strict';

const Controller = require('../lib/base_controller');

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

  async hot() {
    const { ctx } = this;
    const hot = await ctx.service.article.hots();
    this.success(hot);
  }

  async detail() {
    const { ctx } = this;
    ctx.validate({
      id: { type: 'id' },
    }, ctx.query);
    const [ detail ] = await Promise.all([
      // ctx.service.article.viewAddOne(ctx.query.id),
      ctx.service.article.detail(ctx.query),
    ]);
    // await ctx.service.user.viewAddOne(detail?.user?.id);
    // console.log(ctx.status);
    this.success(detail);
  }

  async comments() {
    const { ctx } = this;
    ctx.validate({
      id: { type: 'id' },
    }, ctx.query);
    const comments = await ctx.service.comment.comments(ctx.query);
    this.success(comments);
  }

}

module.exports = ArticleController;
