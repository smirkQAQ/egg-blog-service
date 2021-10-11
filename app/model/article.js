/*
 * @Author: LC
 * @Date: 2021-10-11
 * @Description:
 */

'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;

  const Article = app.model.define('Article', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    uid: {
      type: INTEGER,
      allowNull: false,
    },
    title: {
      type: STRING,
      defaultValue: null,
      comment: '文章标题',
    },
    subTitle: {
      type: STRING(500),
      defaultValue: null,
      field: 'sub_title',
    },
    cover: {
      type: STRING,
      defaultValue: null,
      comment: '封面图片',
    },
    content: {
      type: TEXT,
      defaultValue: null,
      comment: '内容',
    },
    anchor: {
      type: TEXT,
      defaultValue: null,
      comment: 'anchor',
    },
    favorite: {
      type: INTEGER,
      defaultValue: 0,
      comment: '点赞数',
    },
    view: {
      type: INTEGER,
      defaultValue: 0,
      comment: '查看数',
    },
    comment: {
      type: INTEGER,
      defaultValue: 0,
      comment: '评论数',
    },
    status: {
      type: INTEGER,
      defaultValue: 1,
      comment: '1->正常,2->删除',
    },
    categoryId: {
      type: INTEGER,
      allowNull: false,
      field: 'category_id',
    },
    tagId: {
      type: INTEGER,
      allowNull: false,
      field: 'tag_id',
    },
  });
  Article.associate = () => {
    // app.model.Article.hasMany(app.model.Comment, { as: 'comments' });
    // app.model.Article.hasMany(app.model.Favorite);
    app.model.Article.belongsTo(app.model.User, { as: 'User', foreignKey: 'uid' });
    app.model.Article.belongsTo(app.model.Category, { as: 'Category' });
    app.model.Article.belongsTo(app.model.Tag, { as: 'Tag' });
  };
  return Article;
};

