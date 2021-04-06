/*
 * @Author: LC
 * @Date: 2021-03-25
 * @Description: 分类
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagsSchema = new Schema({
  name: { type: String, default: "" },
  group: { type: Number, default: 0 }
})

module.exports = mongoose.model('Tags', tagsSchema)