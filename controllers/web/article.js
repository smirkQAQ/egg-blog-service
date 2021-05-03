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
  // 获取文章详情
  static async getArticleDetail(ctx) {
    let { id, pageSize, pageIndex } = ctx.query;
    const data = await ArticleModel
                      .findById(id)
                      .populate('author', { password: 0 })
                      .populate('comments');
    if(!data) return ctx.error({msg: '获取详情数据失败!'});
    const review = data.review + 1;
    const updateview = await ArticleModel.findOneAndUpdate(data.id, { $set: { review } });

    if(!pageIndex) pageIndex = 1;
    if(!pageSize) pageSize = 10;
    const skip = (Number(pageIndex)-1)*Number(pageSize);
    const totals = await CommentModel.find({ articleId: id }).countDocuments();
    const comments = await CommentModel
                          .find({ articleId: id })
                          .sort({ createdDate: '-1' })
                          .skip(Number(skip))
                          .limit(Number(pageSize));
    return ctx.success({ data:{ data, comments, totals, pageIndex } });
 
  }
}

module.exports = ArticleController;