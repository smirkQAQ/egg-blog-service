/*
 * @ Author: LC
 * @ Date: 2021-03-15
 * @ Description: 统一try catch处理中间件 用于捕获内部错误，输出日志信息
 */
const tracer = require('tracer');
const logger = tracer.colorConsole({
  level: 'error',
  format: '{{timestamp}} <{{title}}> {{file}}(#{{line}}): {{message}}',
  file: 'error.log',
  path: __dirname
});

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.body = {
      error: error,
    };
    if(error.errors) {
      // logger.error(error.stack);
      ctx.body = {
        msg: error.message,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      };
    } else {
      //对于未知的异常，采用特别处理
      ctx.body = {
        msg: 'we made a mistake',
      };
    }
  }
}