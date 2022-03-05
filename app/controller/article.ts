/*
 * @Author: LC
 * @Date: 2022/3/5
 * @Description:
 */

import BaseController from '@/lib/base-controller';
import { GET, RequestMapping } from "@/lib/add-router";

@RequestMapping('/article')
export default class ArticleController extends BaseController {
  @GET('/articleList')
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

  @GET('/hot')
  async hot() {
    const { ctx } = this;
    const hot = await ctx.service.article.hots();
    this.success(hot);
  }

  @GET('/detail')
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
}
