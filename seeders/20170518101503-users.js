'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('users', [{
      username: 'esviai',
      first_name:'Shabrina',
      last_name:'Inmas',
      password: '123456789',
      role: 'seller',
      address: 'PIM 1',
      phone: '081219000000',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'sister',
      first_name:'gueh',
      last_name:'shopaholic',
      password: '123456789',
      role: 'customer',
      address: 'PIM 2',
      phone: '081219000001',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'aunty',
      first_name:'Teyze',
      last_name:'Yilmaz',
      password: '123456789',
      role: 'customer',
      address: 'PIM 3',
      phone: '081219000002',
      createdAt: new Date(),
      updatedAt: new Date()
    }],{});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
      return queryInterface.bulkDelete('users', null, {});
  }
};
