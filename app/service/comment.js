'use strict';

const Service = require('egg').Service;

class Comment extends Service {
  async comments(query) {
    const { Op } = this.app.sequelize;
    const where = { status: 1, toUid: 0 };
    if (query) where.article_id = query.id;
    const result = await this.ctx.model.Comment.findAll({
      where,
    });
    where.toUid = { [Op.ne]: 0 }; // 不等于0
    result.dataValues.child = await this.ctx.model.Comment.findAll({
      where,
    });
    return result;
  }
}

module.exports = Comment;
