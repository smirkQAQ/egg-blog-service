/*
 * @Author: LC
 * @Date: 2021-03-25
 * @Description: 文章相关接口逻辑层
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
    const resuft = await ArticleModel.create(data);
    if(!resuft) return ctx.error({ msg: '文章创建失败!' });

    return ctx.success({ msg:'发表成功!', data: resuft });
  }
}

module.exports = ArticleController;