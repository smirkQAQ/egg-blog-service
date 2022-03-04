/*
 * @Author: LC
 * @Date: 2022/3/2
 * @Description: 事务装饰器
 */
import install from '../lib/add-router/install';
import { Context } from 'egg';

export default (target: any, value?: any | undefined): void => {
  return install(target, value, async (ctx: Context, next: () => Promise<any>) => {
    try {
      await next();
      const transaction = await ctx.app.getTransaction();
      // 如果有事务自动提交
      if (transaction) {
        transaction.commit();
        ctx.app.deleteTransaction();
      }
    } catch {
      const transaction = await ctx.app.getTransaction();
      // 如果有事务自动回滚
      if (transaction) {
        transaction.rollback();
        ctx.app.deleteTransaction();
      }
    }
  });
};
