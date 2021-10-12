/*
 * @Author: LC
 * @Date: 2021-10-11
 * @Description:
 */

'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Tag = app.model.define('tags', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    name: {
      type: STRING(50),
      defaultValue: null,
    },
    categoryId: {
      type: INTEGER,
      allowNull: false,
      field: 'category_id',
    },
    status: {
      type: INTEGER,
      defaultValue: 1,
      comment: '1->正常,2->删除',
    },
  });
  Tag.associate = () => {
    app.model.Tag.belongsTo(app.model.Category, { as: 'category' });
    app.model.Tag.hasMany(app.model.Article, { as: 'article' });
  };
  return Tag;
};
