/*
 * @Author: LC
 * @Date: 2022/1/7
 * @Description: 全局相应中间件 每次路由将执行 谨慎添加逻辑 以免影响性能
 */

import { Context } from 'egg';

// 这里是你自定义的中间件
export default function errorHandler(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);
      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error = status === 500 && ctx.app.config.env === 'prod' ? 'Internal Server Error' : err.message;
      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = {
        code: status,
        message: error,
      };
      if (status === 422) {
        ctx.body.data = err.errors;
      }
      ctx.status = status;
    }
  };
}
