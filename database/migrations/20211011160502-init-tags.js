'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('tags', { id: Sequelize.INTEGER });
     */

    const { INTEGER, STRING, TEXT, ENUM } = Sequelize
    return queryInterface.createTable('tags', {
      id: {
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true,
        comment: '标签id',
      },
      name: {
        type: STRING(50),
        defaultValue: null,
        unique: true,
        comment: '标签名字',
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
