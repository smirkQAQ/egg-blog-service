'use strict';

const Controller = require('../lib/base_controller');

class UserController extends Controller {
  async login() {
    try {
      const { ctx } = this;
      ctx.validate({
        email: 'string',
        password: 'string',
      });
      const { password } = ctx.request.body;
      const p = ctx.helper.cryptPwd(password);
      const user = await ctx.service.user.findUser(ctx.request.body);
      if (!user) {
        this.fail('该用户不存在或者已经被删除');
        return;
      } else if (p !== user.password) {
        this.fail('密码不正确,请重新输入');
        return;
      }
      user.dataValues.token = await ctx.service.user.generateToken({ uid: user.id, email: user.email, type: user.account_type });
      this.success(user);
    } catch (e) {
      this.fail(e, 500);
    }
  }

  async logout() {
    try {
      const { ctx, app } = this;
      const { uid, email } = ctx.locals;
      await app.redis.del(uid + email);
      this.success('已退出登陆');
    } catch (e) {
      this.fail(e, 500);
    }
  }

  async register() {
    try {
      const { ctx, app } = this;
      ctx.validate({
        email: 'email',
        password: { type: 'password' },
        code: { type: 'string' },
      });
      const { code } = ctx.request.body;
      const redisCode = await app.redis.get(ctx.request.ip + 'emailSend');
      if (redisCode && redisCode.substring(0, 6) === code && (redisCode && redisCode.substring(6)) === ctx.request.body.email) {
        const findUserResult = await ctx.service.user.findUser(ctx.request.body);
        if (findUserResult) {
          this.fail('邮箱已被注册');
        } else {
          await ctx.service.user.register(ctx.request.body);
          this.fail('注册成功');
        }
      } else {
        this.fail('验证失败，请重新输入');
      }
    } catch (e) {
      this.fail(e, 500);
    }
  }

  async userList() {
    try {
      const { ctx } = this;
      ctx.validate({
        page: { type: 'int' },
        pageSize: { type: 'int' },
      }, ctx.query);
      const { count, users } = await ctx.service.user.getUsers(ctx.query);
      this.success({ list: users, count });
    } catch (e) {
      this.fail(e, 500);
    }
  }

  async account() {
    try {
      const { ctx } = this;
      const { uid, exp } = ctx.locals;
      const user = await ctx.service.user.queryUserById(uid);
      user.dataValues.exp = exp;
      this.success(user);
    } catch (e) {
      this.fail(e, 500);
    }
  }

  async updateAccount() {
    try {
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

      this.success(user);
    } catch (e) {
      this.fail(e, 500);
    }
  }

  async sendMailCode() {
    try {
      const { ctx, app, config } = this;
      ctx.validate({
        email: 'email',
      }, ctx.query);
      const validateCode = ctx.helper.randomFns();
      const redisCodeResult = await app.redis.get(ctx.request.ip + 'emailSend');
      if (!redisCodeResult) {
        await app.redis.set(ctx.request.ip + 'emailSend', validateCode + ctx.query.email, 'ex', 300); // 保存到redis
        const data = await app.nodemailer.sendMail({
          from: config.nodemailer.auth.user, // 发送者邮箱地址
          to: ctx.query.email, // 接收这邮箱地址
          subject: '你正在注册账号', // 邮件主题
          html: `<div style="width: 690px;
        overflow: hidden;
        padding: 30px;
        background: #fcfbfb;
        border: 1px solid #eaeaea;">
        <img width="150px" src="https://dtcos-1258203853.cos.ap-shenzhen-fsi.myqcloud.com/images/default_bg.jpg" alt="logo">
        <h3>Hi</h3>
        <span style="color: rgb(0, 0, 0); font-size: 15px;"> </span>
        <p>
          <span style="color: rgb(0, 0, 0); font-size: 15px;">您正在 注册账号，验证码为：</span>
          <span style="color: rgb(0, 0, 0); font-size: 15px;">
            <strong><span style="color: rgb(78, 164, 220); font-size: 15px;">${validateCode}</span></strong>
            <span style="font-size: 15px;">。</span>
          </span>
        </p>
        <span style="color: rgb(0, 0, 0); font-size: 15px;"> </span>
        <p><span style="color: rgb(0, 0, 0); font-size: 15px;">请在5分钟内完成验证。</span></p>
        <div style="margin-top: 50px;">
          <span style="color: rgb(0, 0, 0); font-size: 15px;"> </span>
          <p><span style="color: rgb(0, 0, 0); font-size: 15px;">mzlc.fun</span></p>
          <span style="color: rgb(0, 0, 0);"> </span>
          <h5 style="border-top: 1px solid #666;color: #777;
        margin-top: 5px;
        margin-bottom: 10px;
        padding-top: 5px;"><span style="color: rgb(119, 119, 119); font-size: 13px;">此为系统邮件，请勿回复。</span></h5>
        </div>
        </div>`, // html模板
        });
        if (data) {
          this.success();
        } else {
          app.nodemailer.close();
        }
      } else {
        this.fail('请勿重复请求');
      }
    } catch (e) {
      this.fail(e, 500);
    }
  }
}

module.exports = UserController;
