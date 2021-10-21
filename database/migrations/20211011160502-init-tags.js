'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('tags', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('tags', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        comment: '标签id',
      },
      name: {
        type: Sequelize.STRING(50),
        defaultValue: null,
        comment: '标签名字',
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

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
    }).then(() => queryInterface.addIndex('tags', [ 'name', 'status' ]));
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('tags');
     */
    return queryInterface.dropTable('tags');
  },
};
