'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    return queryInterface.bulkInsert('tags', [
      {
        name: 'Vue',
        category_id: 1,
      }, {
        name: 'Angular',
        category_id: 1,
      }, {
        name: 'React',
        category_id: 1,
      }, {
        name: 'JavaScript',
        category_id: 1,
      }, {
        name: 'Mysql',
        category_id: 2,
      }, {
        name: 'Radis',
        category_id: 2,
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('tags', null, {});
  }
};
