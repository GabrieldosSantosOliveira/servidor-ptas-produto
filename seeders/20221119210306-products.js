'use strict';
const { v4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'products',
      [
        {
          id: v4(),
          title: 'Macbook Pro',
          priceForCents: 2000000,
          description:
            'Possui 16GB de RAM e 1TB de armazenamento',
          image:
            'https://http2.mlstatic.com/D_NQ_NP_2X_685939-MLB50509890312_062022-F.webp'
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
