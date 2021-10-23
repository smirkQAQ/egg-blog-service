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
    return queryInterface.createTable('comments', {
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
        allowNull: false,
        field: 'to_uid',
        comment: '评论目标用户id',
      },
      status: {
        type: INTEGER,
        defaultValue: 1,
        comment: '1->正常，2->删除',
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
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    return queryInterface.dropTable('comments');
  }
};
