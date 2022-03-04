/*
 * @Author: LC
 * @Date: 2022/1/11
 * @Description:
 */
import install from '../lib/add-router/install';
import jwt from 'jsonwebtoken';

import { Context } from 'egg';
// 解密，验证
function verifyToken(token: string): any {
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

export default (target: any, value?: any | undefined) => {
  return install(target, value, async (ctx: Context, next: () => Promise<any>) => {
    let authToken: any = ctx.header.authorization; // 获取header里的authorization
    if (authToken) {
      authToken = authToken.split(' ').pop();
      const { uid, email, type, exp } = verifyToken(authToken); // 解密获取的Token
      if (uid && email) {
        // 如果需要限制单端登陆或者使用过程中废止某个token，或者更改token的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效
        // 此处使用redis进行保存
        const redis_token = await ctx.app.redis.get(uid + email); // 获取保存的token
        if (!redis_token) {
          ctx.body = { status: 413, message: '无权限' };
        }
        if (authToken === redis_token) {
          ctx.locals.uid = uid;
          ctx.locals.email = email;
          ctx.locals.exp = exp;
          if ((ctx.path.indexOf('/admin/') !== -1) && (type !== 'ADMIN')) {
            ctx.body = { status: 301, message: '角色无权限' };
          } else {
            await next();
          }
        } else {
          ctx.body = { status: 301, message: '您的账号已在其他地方登录' };
        }
      } else {
        ctx.body = { status: 401, message: 'token已过期' };
      }
    } else {
      ctx.body = { status: 401, message: '未登录' };
    }
  });
};
