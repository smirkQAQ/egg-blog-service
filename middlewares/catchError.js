/*
 * @Author: LC
 * @Date: 2021-09-20
 * @Description: 全局错误处理中间件
 */
const { HttpError } = require('../utils/http-error')

const catchError = async (ctx, next) => {
  try {
    await next()

  } catch (error) {
    const isHttpError = error instanceof HttpError;
    if (isHttpError) {
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.response.status = error.code
    } else {
      ctx.body = {
        msg: "未知错误！",
        error_code: 9999,
        request: `${ctx.method} ${ctx.path}`,
      }
      console.log(error)
      ctx.response.status = 500
    }
  }
}

module.exports = catchError
