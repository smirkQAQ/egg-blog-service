'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async login({ usersData }) {
    const { ctx, app } = this;
    const token = ctx.helper.getToken({ corpid: usersData.corpid, userid: usersData.userid }); // token生成
    await app.redis.get('loginToken').set(usersData.corpid + usersData.userid, token, 'ex', 7200); // 保存到redis
    return token;
  }

  async register({ email, password }) {
    const { ctx } = this;
    return ctx.model.User.create({
      email,
      password: ctx.helper.cryptPwd(password),
    });
  }

  async findUser({ email }) {
    // const { ctx, app } = this;
    const { ctx } = this;

    return ctx.model.User.findOne({
      where: { email, status: 1 },
    });
  }
}

module.exports = UserService;
