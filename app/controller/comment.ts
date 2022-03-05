/*
 * @Author: LC
 * @Date: 2022/3/5
 * @Description:
 */

import BaseController from '@/lib/base-controller';
import {DEL, GET, POST, RequestMapping} from "@/lib/add-router";
import auth from '@/lib/auth';

@RequestMapping('/comment')
export default class CommentController extends BaseController {
  @POST('/comments')
  @auth
  async comments() {
    const { ctx, service } = this;
    try {
      ctx.validate({
        id: 'int',
      }, ctx.query);
      const comments = await service.comment.comments(ctx.query);
      this.success(comments);
    } catch (e) {
      console.log(e);
      this.fail(e);
    }
  }

  @POST('/createComment')
  @auth
  async createComment() {
    const { ctx, service } = this;
    try {
      ctx.validate({
        articleId: 'int',
        content: 'string',
        // toUid: 'int',
        // replyId: 'int',
      });
      await service.comment.createComment(ctx.request.body);
      const message = ctx.request.body.replyId ? '回复成功！' : '评论成功!';
      this.success('null', message);
    } catch (err) {
      this.fail(err);
    }
  }

  @GET('/setTop')
  async setTop() {
    const { ctx, service } = this;
    try {
      ctx.validate({
        id: 'int',
      }, ctx.query);
      const { id } = ctx.query;
      await service.comment.setTop(id);
      this.success({ id }, '置顶成功！');
    } catch (err) {
      this.fail(err);
    }
  }
  @DEL('/deleteComment')
  async deleteComment() {
    const { ctx, service } = this;
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
      await service.comment.deleteComment(id);
      this.success({ id }, '删除成功！');
    } catch (err) {
      this.fail(err);
    }
  }
}