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
      comment: '文章id',
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
      comment: '副标题',
    },
    cover: {
      type: STRING(300),
      defaultValue: null,
      comment: '封面图片',
    },
    content: {
      type: TEXT,
      defaultValue: null,
      comment: '内容',
    },
    favorite: {
      type: INTEGER,
      defaultValue: 0,
      comment: '收藏',
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
    uid: {
      type: INTEGER,
      allowNull: false,
      comment: '作者id',
    },
  });
  Article.associate = () => {
    app.model.Article.belongsTo(app.model.User, { as: 'user', foreignKey: 'uid' });
    app.model.Article.hasMany(app.model.TagRelationships, { as: 'tags', foreignKey: 'articleId' });
  };
  return Article;
};

