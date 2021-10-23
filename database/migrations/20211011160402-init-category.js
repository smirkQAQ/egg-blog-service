'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('categories', { id: Sequelize.INTEGER });
     */

    const { INTEGER, STRING, TEXT, ENUM } = Sequelize
    return queryInterface.createTable('categories', {
      id: {
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true,
        comment: '分类id',
      },
      name: {
        type: STRING(50),
        defaultValue: null,
        comment: '分类名字',
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
