const {
  LoginService
} = require("../service/user")
const { Resolve } = require('../utils/res-temp'); // 响应模板
const res = new Resolve();
const {
  SignInValidator,
  PositiveIdParamsValidator,
  UserLoginValidator
} = require('../validators/user'); // 校验规则

class UserController {
  // 登陆
  static async login(ctx) {
    const v = await new UserLoginValidator().validate(ctx);
    let [err, token, id] = await LoginService.login(
      v.get('body.email'),
      v.get('body.password')
    );
    if (!err) {
      let [err, data] = await LoginService.detail(id);
      if (!err) {
        data.setDataValue('token', token)
        ctx.body = res.json(data);
      }
    } else {
      ctx.body = res.fail(err, err.msg);
    }
  }
  // 注册
  static async signIn(ctx) {
    // 通过验证器校验参数是否通过
    const v = await new SignInValidator().validate(ctx);
    const email = v.get('body.email');
    const username = v.get('body.username');
    const password = v.get('body.password2');
    const [err, data] = await LoginService.signIn({ email, password, username })
    ctx.body = res.json(data,'创建成功', )
  }
}

module.exports = UserController
