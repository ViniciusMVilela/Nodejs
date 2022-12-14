'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Compras', {
      data: {
        type: Sequelize.DATEONLY
      },
      quantidade: {
        type: Sequelize.INTEGER
      },
      valor: {
        type: Sequelize.FLOAT
      },
      CartaoId: {
        allowNull: false,
       primaryKey: true,
        type: Sequelize.INTEGER,
        references:{
          model: 'cartaos',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      PromocaoId: {
      allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
       references:{
          model: 'promocaos',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'   //parte criada manualmente no banco de dados 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Compras');
  }
};