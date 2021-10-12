'use strict';

const Service = require('egg').Service;
// const { literal } = require('sequelize');

class Article extends Service {
  async articles({ page, pageSize, category, tag }) {
    const where = { status: 1 };
    if (category) where.categoryId = category;
    if (tag) where.tagId = tag;
    const { count, rows } = await this.ctx.model.Article.findAndCountAll({
      where,
      offset: (parseInt(page) - 1) * parseInt(pageSize),
      limit: parseInt(pageSize),
      order: [[ 'createdAt', 'DESC' ]],
      attributes: [
        'view',
        'title',
        'favorite',
        'id',
        // 'comment',
        'cover',
        'createdAt',
      ],
      include: [
        {
          model: this.ctx.model.Tag,
          as: 'tag',
        },
        {
          model: this.ctx.model.Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
        {
          model: this.ctx.model.User,
          as: 'user',
          attributes: [ 'id', 'userName', 'email', 'nickName' ],
        },
      ],
    });
    return { count, articles: rows };
  }
}

module.exports = Article;
