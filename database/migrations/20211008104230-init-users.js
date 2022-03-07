'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER, STRING, TEXT, ENUM } = Sequelize
    return queryInterface.createTable('users', {
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
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    }).then(() => {
      queryInterface.addIndex('users', [ 'email', 'status', 'account_type' ])
      queryInterface.bulkInsert('users', [{
        password: 'e10adc3949ba59abbe56e057f20f883e',
        email: '645164947@qq.com',
        nick_name: '菜鸡',
        account_type: 'ADMIN',
      }])
    });
  },

  down: async queryInterface => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('users');
  },
};
