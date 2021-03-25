/*
 * @Author: LC
 * @Date: 2021-03-24
 * @Description: 评论 schema
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  contents: { type: String, required: true },                     // 内容
  articleId: { type: Schema.Types.ObjectId, require: true },      // 文章id
  author: { type: Object },                                       // 评论人
  commentTitle: { type: String },                                 // 评论标题
  star: { type: Number, default: 0 },                             // 点赞
  createdDate: { type: Date, default: Date.now },                 // 评论时间
});

module.exports = mongoose.model('Comment', CommentSchema);
