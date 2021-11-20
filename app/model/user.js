/*
 * @Author: LC
 * @Date: 2021-10-08
 * @Description:
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT, ENUM } = app.Sequelize;

  const User = app.model.define('User', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
      comment: '用户id',
    },
    userName: {
      type: STRING(50),
      defaultValue: null,
      comment: '用户名',
      field: 'user_name',
    },
    password: {
      type: STRING,
      allowNull: false,
      comment: '密码',
    },
    email: {
      type: STRING(100),
      defaultValue: null,
      validate: {
        isEmail: true,
      },
      comment: '邮箱',
    },
    nickName: {
      type: STRING(50),
      defaultValue: null,
      field: 'nick_name',
      comment: '昵称',
    },
    avatar: {
      type: STRING(300),
      defaultValue: null,
      comment: '用户头像',
    },
    website: {
      type: STRING(300),
      defaultValue: null,
      comment: '个人网址',
    },
    github: {
      type: STRING(300),
      defaultValue: null,
      comment: 'github地址',
    },
    gitee: {
      type: STRING(300),
      defaultValue: null,
      comment: 'gitee地址',
    },
    totalView: {
      type: INTEGER,
      defaultValue: 0,
      field: 'total_view',
      comment: '总浏览数',
    },
    totalLike: {
      type: INTEGER,
      defaultValue: 0,
      field: 'total_like',
      comment: '总点赞数',
    },
    totalComment: {
      type: INTEGER,
      defaultValue: 0,
      field: 'total_comment',
      comment: '总评论数',
    },
    profession: {
      type: STRING(100),
      defaultValue: null,
      comment: '职业',
    },
    summary: {
      type: TEXT,
      defaultValue: null,
      comment: '用户简介或签名',
    },
    status: {
      type: INTEGER,
      defaultValue: 1,
      comment: '1->正常,2->删除',
    },
    accountType: {
      type: ENUM('ADMIN', 'GENERAL', 'TOURIST'),
      defaultValue: 'GENERAL',
      field: 'account_type',
      comment: '账号类型',
    },
  });
  User.associate = () => {
    // app.model.User.hasMany(app.model.Article, { foreignKey: 'uid' });
    // app.model.User.hasMany(app.model.Comment);
  };
  return User;
};

