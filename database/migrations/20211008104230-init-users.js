'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      user_name: {
        type: Sequelize.STRING(50),
        defaultValue: null,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        defaultValue: null,
        validate: {
          isEmail: true,
        },
      },
      nick_name: {
        type: Sequelize.STRING(50),
        defaultValue: null,
      },
      avatar: {
        type: Sequelize.STRING(300),
        defaultValue: null,
        comment: '用户头像',
      },
      website: {
        type: Sequelize.STRING(300),
        defaultValue: null,
        comment: '个人网址',
      },
      github: {
        type: Sequelize.STRING(300),
        defaultValue: null,
        comment: 'github地址',
      },
      gitee: {
        type: Sequelize.STRING(300),
        defaultValue: null,
        comment: 'gitee地址',
      },
      total_view: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      total_like: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      total_comment: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      profession: {
        type: Sequelize.STRING(100),
        defaultValue: null,
        comment: '职业',
      },
      summary: {
        type: Sequelize.TEXT,
        defaultValue: null,
        comment: '用户简介或签名',
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        comment: '1->正常,2->删除',
      },
      account_type: {
        type: Sequelize.ENUM('ADMIN', 'GENERAL', 'TOURIST'),
        defaultValue: 'GENERAL',
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
    }).then(() => queryInterface.addIndex('users', [ 'email', 'status', 'account_type' ]));
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
