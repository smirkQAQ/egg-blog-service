'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('articles', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('articles', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        defaultValue: null,
        comment: '文章标题',
      },
      uid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      subTitle: {
        type: Sequelize.STRING(500),
        defaultValue: null,
        field: 'sub_title',
      },
      cover: {
        type: Sequelize.STRING(300),
        defaultValue: null,
      },
      content: {
        type: Sequelize.TEXT,
        defaultValue: null,
        comment: '内容',
      },
      anchor: {
        type: Sequelize.TEXT,
        defaultValue: null,
        comment: 'anchor',
      },
      favorite: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: '收藏',
      },
      view: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: '查看数',
      },
      comment: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: '评论数',
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        comment: '1->正常,2->删除',
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
      tag_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tags',
          key: 'id',
        },
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
