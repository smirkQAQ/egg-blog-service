/*
 * @Author: LC
 * @Date: 2022/3/5
 * @Description:
 */

import { Service } from 'egg';

export default class ArticleService extends Service {
  async createArticle(params, uid) {
    const {
      title,
      content,
      coverImageUrl,
      tagIds = null,
    } = params;
    // 创建事务
    const transaction = await this.app.transaction();
    const articleResult = await this.ctx.model.Article.create({
      title,
      content,
      cover: coverImageUrl,
      uid,
    }, { transaction });
    const tagArr = tagIds?.split(',').map(item => {
      return { articleId: articleResult.id, tagId: item };
    });
    tagArr && await this.ctx.model.TagRelationships.bulkCreate(tagArr, { transaction });
    return articleResult;
  }

  async articles({ page, pageSize, category, tag }: any) {
    const where: any = { status: 1 };
    if (category) where.categoryId = category;
    if (tag) where.tagId = tag;
    const { count, rows } = await this.ctx.model.Article.findAndCountAll({
      where,
      offset: (parseInt(page) - 1) * parseInt(pageSize),
      limit: parseInt(pageSize),
      order: [[ 'createdAt', 'DESC' ]],
      attributes: [
        'id',
        'view',
        'title',
        'subTitle',
        'favorite',
        // 'comment',
        'cover',
        'createdAt',
      ],
      include: [
        {
          model: this.ctx.model.TagRelationships,
          as: 'tags',
          attributes: [ 'id', 'createdAt', 'updatedAt' ],
          include: [
            {
              model: this.ctx.model.Tag,
              as: 'Tag',
              attributes: [ 'name' ],
            },
          ],
        },
        {
          model: this.ctx.model.User,
          as: 'user',
          attributes: [ 'id', 'userName', 'email', 'nickName' ],
        },
      ],
      distinct: true,
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

  async detail({ id }: any) {
    return this.ctx.model.Article.findOne({
      where: { id },
      attributes: {
        exclude: [ 'CategoryId', 'TagId', 'uid', 'status' ],
      },
      include: [
        {
          model: this.ctx.model.TagRelationships,
          as: 'tags',
          attributes: [ 'id', 'createdAt', 'updatedAt' ],
          include: [
            {
              model: this.ctx.model.Tag,
              as: 'Tag',
              attributes: [ 'name' ],
            },
          ],
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

  async deleteArticle(id) {
    return this.ctx.model.Article.update(
      {
        status: 2,
      },
      {
        where: { id },
      }
    );
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
