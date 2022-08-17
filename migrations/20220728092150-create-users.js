'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique:true
      },
      password: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING,
        unique:true
      },
      isadmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      bio: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING,
        defaultValue:'https://firebasestorage.googleapis.com/v0/b/flytographer-a1fa1.appspot.com/o/avatar%2Fprofile-icon-png-908.png?alt=media&token=3d4fc76e-e162-4074-b8d8-d7b4cd8c3ad4'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};