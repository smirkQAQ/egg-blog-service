/*
 * @Author: LC
 * @Date: 2021/10/23
 * @Description:
 */

'use strict';

module.exports = app => {
  const { TEXT, INTEGER } = app.Sequelize;
  return app.model.define('Comment', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
      comment: '评论id',
    },
    articleId: {
      type: INTEGER,
      allowNull: false,
      field: 'article_id',
      comment: '被评论文章id',
    },
    content: {
      type: TEXT,
      defaultValue: null,
      comment: '评论内容',
    },
    fromUid: {
      type: INTEGER,
      allowNull: false,
      field: 'from_uid',
      comment: '评论用户id',
    },
    toUid: {
      type: INTEGER,
      defaultValue: 0,
      allowNull: false,
      field: 'to_uid',
      comment: '评论目标用户id',
    },
    replyId: {
      type: INTEGER,
      defaultValue: 0,
      allowNull: false,
      field: 'reply_id',
      comment: '回复id'
    },
    status: {
      type: INTEGER,
      defaultValue: 1,
      comment: '1->正常，2->删除',
    },
  });
};
