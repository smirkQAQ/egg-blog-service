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
    return queryInterface.createTable('tag_relationships', {
      id: {
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true,
      },
      articleId: {
        type: INTEGER,
        allowNull: false,
        field: 'article_id',
        comment: '文章id',
      },
      tagId: {
        type: INTEGER,
        allowNull: false,
        field: 'tag_id',
        comment: '标签id',
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
    return queryInterface.dropTable('tag_relationships');
  }
};
