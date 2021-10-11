'use strict';

const Controller = require('egg').Controller;
const { Success } = require('../lib/response_status');

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
      ctx.body = Success(null, '该用户不存在或者已经被删除', 400);
      return;
    } else if (ctx.helper.cryptPwd(password) !== user.password) {
      ctx.body = Success(null, '密码不正确,请重新输入', 400);
      return;
    }
    user.dataValues.token = await ctx.service.user.generateToken({ uid: user.id, email: user.email, type: user.account_type });
    ctx.body = Success(user);
  }

  async logout() {
    const { ctx, app } = this;
    const { uid, email } = ctx.locals;
    await app.redis.del(uid + email);
    ctx.body = Success(null, '已退出登陆');
  }

  async register() {
    const { ctx, app } = this;
    ctx.validate({
      email: 'email',
      password: { type: 'password' },
      code: { type: 'int' },
    });
    const { code } = ctx.request.body;
    const redisCode = await app.redis.get('sendValidateCode' + code);
    if (redisCode === code) {
      const findUserResult = await ctx.service.user.findUser(ctx.request.body);
      if (findUserResult) {
        ctx.body = Success(null, '邮箱已被注册', 400);
      } else {
        await ctx.service.user.register(ctx.request.body);
        ctx.body = Success(null, '注册成功');
      }
    } else {
      ctx.body = Success(null, '校验错误', 400);
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
    ctx.body = Success(user);
  }

  async updateAccount() {
    const { ctx } = this;
    const { uid } = ctx.locals;
    ctx.validate({
      // email: { type: 'email', required: true },
      nickName: { type: 'string', allowEmpty: true, required: false },
      profession: { type: 'string', allowEmpty: true, required: false },
      summary: { type: 'string', allowEmpty: true, required: false },
      website: { type: 'string', allowEmpty: true, required: false },
      github: { type: 'string', allowEmpty: true, required: false },
      gitee: { type: 'string', allowEmpty: true, required: false },
    });
    await ctx.service.user.updateAccount(ctx.request.body, uid);
    const user = await ctx.service.user.queryUserById(uid);

    ctx.body = Success(user);
  }

  async sendMailCode() {
    const { ctx, app, config } = this;
    ctx.validate({
      email: 'email',
    }, ctx.query);
    const validateCode = ctx.helper.randomFns();
    await app.redis.set('sendValidateCode' + ctx.query.email, validateCode, 'ex', 300); // 保存到redis

    const data = await app.nodemailer.sendMail({
      from: config.nodemailer.auth.user, // 发送者邮箱地址
      to: ctx.query.email, // 接收这邮箱地址
      subject: '验证你的电子邮件', // 邮件主题
      html: `
      <p>你好！</p>
      <p>您正在注册p***hub账号</p>
      <p>你的验证码是：<strong style="color: #ff4e2a;">${validateCode}</strong></p>
      <p>***该验证码5分钟内有效***</p>`, // html模板
    });
    if (data) {
      console.log(data);
      ctx.body = data;
    }
  }
}

module.exports = UserController;
