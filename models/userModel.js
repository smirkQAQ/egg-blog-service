/*
 * @ Author: LC
 * @ Date: 2021-03-14
 * @ Description: 用户schema
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },               // 用户名
  displayName: { type: String, required: true },        // 昵称
  password: { type: String, required: true },           // 密码
  email: { type: String, default: '' },                 // 邮箱
  avatar: { type: String, default:'' },                 // 头像
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);