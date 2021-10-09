'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    ctx.validate({
      email: 'string',
      password: 'string',
    });
    const { password } = ctx.request.body;
    const user = await ctx.service.user.findUser(ctx.request.body);
    if (!user) {
      ctx.body = {
        code: 400,
        msg: '该用户不存在或者已经被删除',
      };
      return;
    } else if (ctx.helper.cryptPwd(password) !== user.password) {
      ctx.body = {
        code: 400,
        msg: '密码不正确，请重新输入',
      };
      return;
    }
    user.dataValues.token = await ctx.service.user.generateToken({ uid: user.id, email: user.email, type: user.account_type });
    ctx.body = {
      code: 200,
      data: user,
    };
  }

  async logout() {
    const { ctx, app } = this;
    ctx.validate({
      id: 'string',
    }, ctx.query);
    const { id } = ctx.query;
    const userResult = await ctx.service.user.findUser({ id: ctx.helper.toInt(id) });
    if (!userResult) {
      ctx.body = {
        code: 500,
        errMsg: 'error',
      };
      return;
    }
    await app.redis.del(id + userResult.email);
    ctx.body = {
      code: 200,
      msg: '已退出登陆',
    };
  }

  async register() {
    const { ctx } = this;
    ctx.validate({
      email: 'email',
      password: { type: 'password' },
    });
    const findUserResult = await ctx.service.user.findUser(ctx.request.body);
    if (findUserResult) {
      ctx.body = {
        code: 200,
        msg: '邮箱已被注册',
        // data: null,
      };
    } else {
      await ctx.service.user.register(ctx.request.body);
      ctx.body = {
        code: 200,
        msg: '注册成功',
        // data: null,
      };
    }
  }

  async userList() {
    const { ctx } = this;
    ctx.validate({
      page: { type: 'int' },
      pageSize: { type: 'int' },
    }, ctx.query);
    const { count, users } = await ctx.service.user.getUsers(ctx.query);
    ctx.body = {
      code: 200,
      data: {
        list: users,
      },
      count,
      msg: 'Success',
    };
  }

  async account() {
    const { ctx } = this;
    const { uid, exp } = ctx.locals;
    const user = await ctx.service.user.queryUserById(uid);
    user.dataValues.exp = exp;
    ctx.body = {
      code: 200,
      msg: 'Success',
      data: user,
    };
  }

  async updateAccount() {
    const { ctx } = this;
    ctx.validate({
      email: { type: 'email', required: false },
      nickname: { type: 'string', allowEmpty: true, required: false },
      profession: { type: 'string', allowEmpty: true, required: false },
      summary: { type: 'string', allowEmpty: true, required: false },
      website: { type: 'string', allowEmpty: true, required: false },
      github: { type: 'string', allowEmpty: true, required: false },
      gitee: { type: 'string', allowEmpty: true, required: false },
    });
  }
}

module.exports = UserController;
