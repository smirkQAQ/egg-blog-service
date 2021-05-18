/*
 * @ Author: LC
 * @ Date: 2021-03-14
 * @ Description: 用户相关和接口逻辑
 */
const md5 = require('md5');
// const UserMode = mongoose.model('User', new Schema({
//   name: { type: String, required: true },               // 用户名
//   displayName: { type: String, required: true },        // 昵称
//   password: { type: String, required: true },           // 密码
//   email: { type: String, default: '' },                 // 邮箱
//   avatar: { type: String, default:'' },                 // 头像
//   createdDate: { type: Date, default: Date.now },
//   updatedDate: { type: Date, default: Date.now }
// }));
const UserModel = require('../../models/userModel');
const jwt = require("jsonwebtoken");

class UserController {
  // 注册
  static async registered(ctx) {
    const { name, displayName, email, password, apassword } = ctx.request.body;
    if(!name || !password) {
      return ctx.error({ msg: '用户名或密码不能为空!' });
    }
    if(password != apassword) {
      return ctx.error({ msg: '两次输入的密码不一致!' });
    }
    const ishas = await UserModel.findOne({ name });
    if(ishas){
      return ctx.error({ msg: '该用户已存在!' });
    }
    const result = await UserModel.create({ name, displayName, email, password });
    if(!result) {
      return ctx.error({ msg: '注册失败!' });
     }
     return ctx.success({ msg: '注册成功' });

  }
  // 用户登陆
  static async login(ctx) {
    const { name, password } = ctx.request.body;
    if(!name || !password) {
      return ctx.error({ msg: '获取用户失败!' });
    }
    let data = await UserModel.findOne({ name, password }, { password: 0 }).lean();
    if(!data) return ctx.error({ msg: '用户名或密码错误!' });
    const token = jwt.sign(
      { name: data.name },
      "blog_token", 
      { expiresIn: 60 * 60 } // 60 * 60 s
    );
    data.token = token
    ctx.success({ msg: '登录成功', data });
  }

}

module.exports = UserController;