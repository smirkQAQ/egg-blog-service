'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('categories', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('categories', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        comment: '分类id',
      },
      name: {
        type: Sequelize.STRING(50),
        defaultValue: null,
        comment: '分类名字',
      },
      status: {
        type: Sequelize.INTEGER,
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
    }).then(() => queryInterface.addIndex('categories', [ 'name', 'status' ]));
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('categories');
     */
    return queryInterface.dropTable('categories');
  },
};
