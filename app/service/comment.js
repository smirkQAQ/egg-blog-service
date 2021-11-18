'use strict';

const Service = require('egg').Service;

class Comment extends Service {
  async comments(query) {
    const where = { status: 1 };
    if (query) where.article_id = query.id;
    const result = await this.ctx.model.Comment.findAll({
      where,
      // attributes: []
    });
    const topComment = result.filter(item => {
      return item.toUid === 0
    })
    const replyComment = result.filter(item => {
      return item.toUid !== 0
    })
    topComment.forEach(topItem => {
      replyComment.forEach(replyItem => {
        if (topItem.id === replyItem.replyId) {
          topItem.dataValues.child = replyComment
        } else {
          topItem.dataValues.child = []
        }
      })
    })
    return topComment;
  }
}

module.exports = Comment;
