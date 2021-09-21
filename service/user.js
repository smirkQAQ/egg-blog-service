const { generateToken } = require("../utils/util");
const { User } = require('../models/user')
const md5 = require('md5')

class LoginService {
  // 注册
  static async signIn(params) {
    const { email, password, username } = params
    const hasUser = await User.findOne({
      where: {
        email,
        deleted_at: null
      }
    });
    if (hasUser) {
      throw new global.errs.Existing('用户已存在');
    }
    const user = new User();
    user.username = username
    user.email = email
    user.password = password
    try {
      const res = await user.save();
      const data = {
        email: res.email,
        username: res.username
      }
      return [null, data]
    } catch (err) {
      return [err, null]
    }
  }

  static async login(email, password) {
    // 查询用户是否存在
    let options = {
      where: {
        email,
        status: 1
      }
    }
    // isNoFilter && delete options.where.status
    const user = await User.findOne(options)
    if (!user) {
      throw new global.errs.AuthFailed('账号不存在')
    }
    // 验证密码是否正确
    const correct = md5(password) === user.password;
    if (!correct) {
      throw new global.errs.AuthFailed('账号不存在或者密码不正确')
    }
    return  [null, generateToken(user.id), user.id]
  }

  static async detail(id, status) {
    const scope = 'bh';
    const filter = {
      id
    }
    if(status) {
      filter.status = status
    }
    // 查询用户是否存在
    const user = await User.scope(scope).findOne({
      where: filter
    })

    if (!user) {
      throw new global.errs.AuthFailed('账号不存在或者已被禁用，请联系管理员！')
    }

    return [null, user]
  }
}

module.exports = {
  LoginService
}