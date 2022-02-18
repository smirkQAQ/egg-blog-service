/*
 * @Author: LC
 * @Date: 2021/11/8
 * @Description:
 */

'use strict';

const Controller = require('../lib/base_controller');

class CommentController extends Controller {
  async comments() {
    const { ctx } = this;
    try {
      ctx.validate({
        id: 'int',
      }, ctx.query);
      const comments = await ctx.service.comment.comments(ctx.query);
      this.success(comments);
    } catch (e) {
      console.log(e);
      this.fail(e);
    }
  }

  async createComment() {
    const { ctx } = this;
    try {
      ctx.validate({
        articleId: 'int',
        content: 'string',
        // toUid: 'int',
        // replyId: 'int',
      });
      await ctx.service.comment.createComment(ctx.request.body);
      const message = ctx.request.body.replyId ? '回复成功！' : '评论成功!';
      this.success('null', message);
    } catch (err) {
      this.fail(err);
    }
  }

  async setTop() {
    const { ctx } = this;
    try {
      ctx.validate({
        id: 'int',
      }, ctx.query);
      const { id } = ctx.query;
      await ctx.service.comment.setTop(id);
      this.success({ id }, '置顶成功！');
    } catch (err) {
      this.fail(err);
    }
  }

  async deleteComment() {
    const { ctx } = this;
    try {
      ctx.validate({
        id: 'int',
      }, ctx.query);
      const { id } = ctx.query;
      // const { uid } = ctx.locals;
      // const articleDetail = await ctx.service.article.detail(ctx.query);
      // if (articleDetail?.user?.id !== uid) {
      //   throw Error('删除失败');
      // }
      await ctx.service.comment.deleteComment(id);
      this.success({ id }, '删除成功！');
    } catch (err) {
      this.fail(err);
    }
  }
}

module.exports = CommentController;
