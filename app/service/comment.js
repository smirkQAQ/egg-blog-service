'use strict';

const Service = require('egg').Service;

class Comment extends Service {
  async comments(query) {
    const { Op } = this.app.Sequelize;
    const where = { status: 1, toUid: 0 };
    if (query) where.article_id = query.id;
    const result = await this.ctx.model.Comment.findAll({
      where,
    });
    where.toUid = { [Op.ne]: 0 }; // 不等于0
    const childResult = await this.ctx.model.Comment.findAll({ where });
    console.log(childResult);
    result.dataValues.aa = 'sb';
    return result;
  }
}

module.exports = Comment;
