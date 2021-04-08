/*
 * @Author: LC
 * @Date: 2021-03-25
 * @Description: 分类
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagsSchema = new Schema({
  aid: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, default: "" },    // 内容
})

module.exports = mongoose.model('Tags', tagsSchema)