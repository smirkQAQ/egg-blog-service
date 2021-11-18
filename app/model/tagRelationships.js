/*
 * @Author: LC
 * @Date: 2021/11/16
 * @Description:
 */

'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;
  const TagRelationships = app.model.define('tagRelationships', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    articleId: {
      type: INTEGER,
      allowNull: false,
      field: 'article_id',
      comment: '文章id',
    },
    tagId: {
      type: INTEGER,
      allowNull: false,
      field: 'tag_id',
      comment: '标签id',
    },
    status: {
      type: INTEGER,
      defaultValue: 1,
      comment: '1->正常，2->删除',
    },
  });
  TagRelationships.associate = () => {
    app.model.TagRelationships.belongsTo(app.model.Article, { as: 'tags', foreignKey: 'articleId' });
    app.model.TagRelationships.belongsTo(app.model.Tag, { as: 'Tag', foreignKey: 'tagId' });
  };
  return TagRelationships;
};
