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
  // 评论
  static async createComment(ctx) {
    let user = {
      
    }
  }
}

module.exports = ArticleController;