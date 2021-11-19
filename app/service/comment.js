'use strict';

const Service = require('egg').Service;

class Comment extends Service {
  async comments(query) {
    const where = { status: 1 };
    if (query) where.articleId = query.id;
    const result = await this.ctx.model.Comment.findAll({
      where,
      attributes: { exclude: [ 'articleId', 'fromUid', 'toUid', 'status', 'updatedAt' ] },
      include: [
        {
          model: this.ctx.model.User,
          as: 'fromUser',
          attributes: [ 'id', 'email', 'nickName' ],
        },
        {
          model: this.ctx.model.User,
          as: 'toUser',
          attributes: [ 'id', 'email', 'nickName' ],
        },
      ],
    });
    const topComment = result.filter(item => {
      return item.toUser === null;
    });
    const replyComment = result.filter(item => {
      return item.toUser !== null;
    });
    topComment.forEach(topItem => {
      topItem.dataValues.replys = [];
      replyComment.forEach(replyItem => {
        if (topItem.id === replyItem.replyId) {
          topItem.dataValues.replys.push(replyItem);
        }
      });
    });
    return topComment;
  }

  createComment({ articleId, content, toUid = 0, replyId = 0 }) {
    const { uid } = this.ctx.locals;
    return this.ctx.model.Comment.create({
      articleId,
      content,
      fromUid: uid,
      toUid,
      replyId,
    });
  }

  setTop(id) {
    return this.ctx.model.Comment.update(
      {
        isTop: 1,
      },
      {
        where: { id },
      }
    );
  }

  async deleteComment(id) {
    return this.ctx.model.Comment.update(
      {
        status: 2,
      },
      {
        where: { id },
      }
    );
  }
}

module.exports = Comment;
