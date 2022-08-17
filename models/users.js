'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Users.hasMany(models.Files,{
        foreignKey: 'id'
      })
      models.Users.hasMany(models.Save,{
        foreignKey: 'id'
      })
      models.Users.hasMany(models.Likes,{
        foreignKey: 'id'
      })
    }
  }
  Users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    isadmin: DataTypes.BOOLEAN,
    bio: DataTypes.STRING,
    location: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};