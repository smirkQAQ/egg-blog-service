/*
 * @Author: LC
 * @Date: 2021-03-24
 * @Description: 文章schema
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: { type: String, required: true },                        // 标题
  // articleTags: { type: Schema.Types.ObjectId, required: true },   // 文章类别
  articleType: { type: String, required: true },                  // 文章形式 连载、原创、转载三种
  oldUrl: { type: String },                                       // 原文链接
  coverPhoto: { type: String, default: 'https://dtcos-1258203853.cos.ap-shenzhen-fsi.myqcloud.com/images/default_bg.jpg' },                    // 文章封面图
  author: { type: Schema.Types.ObjectId, ref: 'User' },           // 作者
  review: { type: Number, default: 0 },                           // 浏览数量
  star: { num: Number, user: Array },                             // 点赞 num为点赞数量，user为点赞的用户id
  content: { type: String, required: true },                      // 内容
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],     // 评论
  createdDate: { type: Date, default: Date.now },                 // 创建时间
  updatedDate: { type: Date, default: Date.now }                  // 修改时间
});

module.exports = mongoose.model('Article', ArticleSchema);