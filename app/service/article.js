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
      offset: (page - 1) * pageSize ,
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
          attributes: [[ 'id', 'value' ], [ 'name', 'key' ]],
        },
        {
          model: this.ctx.model.Category,
          as: 'category',
          attributes: [[ 'id', 'value' ], [ 'name', 'key' ]],
        },
        {
          model: this.ctx.model.User,
          as: 'user',
          attributes: [ 'id', 'userName', 'email', 'nickName' ],
        },
      ],
    });
    return { count, rows };
  }

  async hots() {
    return this.ctx.model.Article.findAll({
      order: [[ 'view', 'DESC' ]],
      limit: 10,
      attributes: [ 'view', 'title', 'favorite', 'id', 'comment' ],
    });
  }

  async detail({ id }) {
    return this.ctx.model.Article.findOne({
      where: { id },
      attributes: {
        exclude: [ 'CategoryId', 'TagId' ],
      },
      include: [
        {
          model: this.ctx.model.Tag,
          as: 'tag',
        },
        {
          model: this.ctx.model.Category,
          as: 'category',
        },
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
            'github',
            'website',
            'gitee',
          ],
        },
      ],
    });
  }

  async viewAddOne(id) {
    const { literal } = this.app.Sequelize;
    return this.ctx.model.Article.update(
      {
        view: literal('view + 1'),
      },
      {
        where: { id },
      }
    );
  }
}

module.exports = Article;
