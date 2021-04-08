/*
 * @Author: LC
 * @Date: 2021-03-25
 * @Description: 文章后台相关接口逻辑层
 */
const ArticleModel = require('../../models/articleModel');  // 文章
const CommentModel = require('../../models/commentModel');  // 评论
const ReplyModel = require('../../models/replyModel');      // 回复
const UserModel = require('../../models/userModel');        // 用户
const TagsModel = require('../../models/tagsModel');        // 类别

class ArticleController {
  // 发表文章
  static async createArticle(ctx) {
    const data = ctx.request.body;
    if (!data) return ctx.error({ msg: '错误传参！' });
    const isRepetition = await ArticleModel.findOne({ title: data.title });
    if (isRepetition) return ctx.error({ msg: '标题重复' });
    data.star = { user: [], num: 0 };
    const resuft = await ArticleModel.create(data);
    data.articleTags.forEach(item => {
      TagsModel.create({aid: resuft._id, name: item})
    })
    if(!resuft) return ctx.error({ msg: '文章创建失败!' });
    return ctx.success({ msg:'发表成功!', data: resuft });
  }
  // 上传封面图片
  static async createUpload(ctx) {
    const { url, id } = ctx.upload; 
    if(!url) return ctx.error({ msg: '上传失败!' });
    return ctx.success({ msg: '上传成功!', data: { url, id } });
  }
  // 编辑文章
  static async articlePut(ctx) {   
    const { id } = ctx.request.body;
    return ctx.success({ msg:'待开发' });
  }
  // 删除文章
  static async delArticle(ctx) {   
    const { id } = ctx.query;
    return ctx.success({ msg:'待开发' });
  }
  // 删除评论
  static async delComment(ctx) {   
    const { id } = ctx.query;
    return ctx.success({ msg:'待开发' });
  }
}

module.exports = ArticleController;