/*
 * @Author: LC
 * @Date: 2021-03-24
 * @Description: 回复 schema
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReplySchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },     
  comentTitle: { type: String },                            
  star: { type: Number, default: 0 },                       // 点赞
  reply: [{ type: Schema.Types.ObjectId, ref: 'User' }],      
  contents: { type: String, required: true },                // 内容
  createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Reply', ReplySchema);
