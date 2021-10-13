'use strict';

const Service = require('egg').Service;

class Comment extends Service {
  async comments(query) {
    const where = { status: 1 };
    if (query) where.article_id = query.id;
    return this.ctx.model.Comment.findAll({
      where,
      include: [
        {
          model: this.ctx.model.User,
          as: 'user',
          attributes: [
            'id',
            'userName',
            'email',
            'nickName',
            'totalView',
            'totalLike',
            'totalComment',
            'profession',
            'avatar',
          ],
        },
        {
          model: this.ctx.model.Article,
          as: 'article',
          attributes: [ 'view', 'title', 'favorite', 'id', 'comment' ],
        },
      ],
    });
  }
}

module.exports = Comment;