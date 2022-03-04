/*
 * @Author: LC
 * @Date: 2022/3/4
 * @Description:
 */

import { Service } from 'egg';

export default class UserService extends Service {
  async generateToken(data) {
    const { ctx, app } = this;
    const token = ctx.helper.getToken(data); // token生成
    await app.redis.set(data.uid + data.email, token, 'ex', 7200); // 保存到redis
    return token;
  }
}