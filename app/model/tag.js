/*
 * @Author: LC
 * @Date: 2021-10-11
 * @Description:
 */

'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Tag = app.model.define('Tag', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
      comment: '标签id',
    },
    name: {
      type: STRING(50),
      defaultValue: null,
      comment: '标签名字',
    },
    status: {
      type: INTEGER,
      defaultValue: 1,
      comment: '1->正常,2->删除',
    },
  });
  Tag.associate = () => {
    app.model.Tag.hasOne(app.model.TagRelationships, { foreignKey: 'tagId' });
  };
  return Tag;
};
