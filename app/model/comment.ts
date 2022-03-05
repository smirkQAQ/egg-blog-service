/*
 * @Author: LC
 * @Date: 2021/10/23
 * @Description:
 */

export default app => {
  const { TEXT, INTEGER } = app.Sequelize;
  const Comment = app.model.define('Comment', {
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
      comment: '回复id',
    },
    isTop: {
      type: INTEGER,
      defaultValue: 0,
      field: 'is_top',
      comment: '0->不置顶，1->置顶',
    },
    status: {
      type: INTEGER,
      defaultValue: 1,
      comment: '1->正常，2->删除',
    },
  });
  Comment.associate = () => {
    app.model.Comment.belongsTo(app.model.User, { as: 'fromUser', foreignKey: 'fromUid' });
    app.model.Comment.belongsTo(app.model.User, { as: 'toUser', foreignKey: 'toUid' });
  };
  return Comment;
};
