const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
const unless = require("koa-unless")
const config = require('../config/config');
const globalConfig = config[process.env.NODE_ENV];
class Auth {
  constructor(level) {
    this.level = level || 1; // 1 超级管理员
  }

  get m() {
    // token 检测
    // token 开发者 传递令牌
    // token body header
    // HTTP 规定 身份验证机制 HttpBasicAuth
    // 注意：放在路由前面
    const middleware = async (ctx, next) => {
      const tokenToken = basicAuth(ctx.req); // 解析 header 的 authorization 内的值
      let errMsg = "无效的token";
      // 无带token
      if (!tokenToken || !tokenToken.name) {
        errMsg = "需要携带token值";
        throw new global.errs.Forbidden(errMsg);
      }

      try {
        // 解密
        var decode = jwt.verify(tokenToken.name, globalConfig.secret.secretKey);

      } catch (error) {
        // token 不合法 过期
        if (error.name === 'TokenExpiredError') {
          errMsg = "token已过期"
        }

        throw new global.errs.Forbidden(errMsg);
      }

      if (decode.scope < this.level) {
        errMsg = "权限不足"
        throw new global.errs.Forbidden(errMsg);
      }

      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }

      await next()
    }
    middleware.unless = unless
    return middleware
  }

}

module.exports = Auth