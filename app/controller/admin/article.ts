/*
 * @Author: LC
 * @Date: 2022/3/5
 * @Description:
 */

import BaseController from '@/lib/base-controller';
import { DEL, POST, RequestMapping } from '@/lib/add-router';
import auth from '@/lib/auth';
import transaction from "@/lib/transaction";

@RequestMapping('/api/admin')
@auth
export default class AdminArticleController extends BaseController {
  @DEL('/deleteArticle')
  async deleteArticle() {
    try {
      const { ctx, service } = this;
      ctx.validate({
        id: { type: 'int' },
      }, ctx.query);
      const { id } = ctx.query;
      await service.article.deleteArticle(id);
      this.success({ id }, '删除成功！');
    } catch (err) {
      this.fail(err);
    }
  }

  @POST('/saveArticle')
  @transaction
  async saveArticle() {
    const { ctx, service } = this;
    ctx.validate({
      title: { type: 'string' },
      content: { type: 'string' },
      coverImageUrl: { type: 'string' },
      // tagIds,
    });
    const { uid } = ctx.locals;
    const create = await service.article.createArticle(ctx.request.body, uid);
    this.success(create, '创建成功！');
  }
}
