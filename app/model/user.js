'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT, ENUM } = app.Sequelize;

  const User = app.model.define('users', {
    id: { type: INTEGER, primaryKey: true, utoIncrement: true },
    user_name: {
      type: STRING(50),
      defaultValue: null,
    },
    password: {
      type: STRING(200),
      defaultValue: null,
    },
    email: {
      type: STRING(100),
      defaultValue: null,
    },
    nick_name: {
      type: STRING(300),
      defaultValue: null,
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
    total_view: {
      type: INTEGER,
      defaultValue: 0,
    },
    total_like: {
      type: INTEGER,
      defaultValue: 0,
    },
    total_comment: {
      type: INTEGER,
      defaultValue: 0,
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
    account_type: {
      type: ENUM('ADMIN', 'GENERAL', 'TOURIST'),
      defaultValue: 'GENERAL',
    },
  });
  User.associate = () => {

  };
  return User;
};

