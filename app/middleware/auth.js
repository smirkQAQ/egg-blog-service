'use strict';

const jwt = require('jsonwebtoken'); // 引入jsonwebtoken

// 解密，验证
function verifyToken(token) {
  let res = '';
  try {
    const result = jwt.verify(token, '9527') || {};
    const { exp } = result,
      current = Math.floor(Date.now() / 1000);
    if (current <= exp) res = result || {};
  } catch (e) {
    // console.log(e);
  }
  return res;
}

module.exports = (options, app) => {
  return async function auth(ctx, next) {
    let authToken = ctx.header.authorization; // 获取header里的authorization
    if (authToken) {
      authToken = authToken.substring(7);// 删除 Bearer
      const { uid, email, type, exp } = verifyToken(authToken); // 解密获取的Token
      if (uid && email) {
        // 如果需要限制单端登陆或者使用过程中废止某个token，或者更改token的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效
        // 此处使用redis进行保存
        const redis_token = await app.redis.get(uid + email); // 获取保存的token
        if (!redis_token) {
          ctx.status = 200;
          ctx.body = { code: 413, message: '无权限' };
          return;
        }
        if (authToken === redis_token) {
          ctx.locals.uid = uid;
          ctx.locals.email = email;
          ctx.locals.exp = exp;
          await next();
        } else {
          ctx.status = 200;
          ctx.body = { code: 301, message: '您的账号已在其他地方登录' };
        }
      } else {
        ctx.status = 200;
        ctx.body = { code: 401, message: 'token已过期' };
      }
    } else {
      ctx.body = { code: 403, message: '请登陆后再进行操作' };
    }
  };
};
