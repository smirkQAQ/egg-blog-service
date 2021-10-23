'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('articles', { id: Sequelize.INTEGER });
     */

    const { INTEGER, STRING, TEXT, ENUM } = Sequelize
    return queryInterface.createTable('articles', {
      id: {
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true,
        comment: '文章id',
      },
      author: {
        type: INTEGER,
        allowNull: false,
        comment: '作者id',
      },
      title: {
        type: STRING,
        defaultValue: null,
        comment: '文章标题',
      },
      subTitle: {
        type: STRING(500),
        defaultValue: null,
        field: 'sub_title',
        comment: '副标题',
      },
      cover: {
        type: STRING(300),
        defaultValue: null,
        comment: '封面图片',
      },
      content: {
        type: TEXT,
        defaultValue: null,
        comment: '内容',
      },
      favorite: {
        type: INTEGER,
        defaultValue: 0,
        comment: '收藏',
      },
      view: {
        type: INTEGER,
        defaultValue: 0,
        comment: '查看数',
      },
      comment: {
        type: INTEGER,
        defaultValue: 0,
        comment: '评论数',
      },
      status: {
        type: INTEGER,
        defaultValue: 1,
        comment: '1->正常,2->删除',
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
    }).then(() => queryInterface.addIndex('articles', [ 'status' ]));
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('articles');
     */
    return queryInterface.dropTable('articles');
  },
};
