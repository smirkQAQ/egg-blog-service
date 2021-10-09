'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT, ENUM } = app.Sequelize;

  const User = app.model.define('users', {
    id: { type: INTEGER, primaryKey: true, utoIncrement: true }, // key 自增量
    userName: {
      type: STRING(50),
      defaultValue: null,
      field: 'user_name',
    },
    password: {
      type: STRING(200),
      defaultValue: null,
    },
    email: {
      type: STRING(100),
      defaultValue: null,
    },
    nickName: {
      type: STRING(300),
      defaultValue: null,
      field: 'nick_name',
    },
    avatar: {
      type: STRING(300),
      defaultValue: null,
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
    },
    totalLike: {
      type: INTEGER,
      defaultValue: 0,
      field: 'total_like',
    },
    totalComment: {
      type: INTEGER,
      defaultValue: 0,
      field: 'total_comment',
    },
    profession: {
      type: STRING(100),
      defaultValue: null,
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
    },
  });
  User.associate = () => {

  };
  return User;
};

