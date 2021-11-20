/*
 * @Author: LC
 * @Date: 2021-10-11
 * @Description:
 */

'use strict';

const Controller = require('../../lib/base_controller');

class AdminArticleController extends Controller {
  async deleteArticle() {
    try {
      const { ctx } = this;
      ctx.validate({
        id: { type: 'int' },
      });
      const { id } = ctx.request.body;
      await ctx.service.article.deleteArticle(id);
      this.success();
    } catch (err) {
      this.fail(err);
    }
  }

  async saveArticle() {
    try {
      const { ctx } = this;
      ctx.validate({
        title: { type: 'string' },
        content: { type: 'string' },
        coverImageUrl: { type: 'string' },
        // tagIds,
      });
      const { uid } = ctx.locals;
      const create = await ctx.service.article.createArticle(ctx.request.body, uid);
      this.success(create);
    } catch (err) {
      this.fail(err);
    }
  }

  async test() {
    this.success();
  }
}

module.exports = AdminArticleController;
