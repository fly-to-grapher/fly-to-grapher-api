'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Likes.belongsTo(models.Files, {
        foreignKey: 'file_id'
      })
      Likes.belongsTo(models.Users, {
        foreignKey: 'user_id'
      })
    }
  }
  Likes.init({
    user_id: DataTypes.INTEGER,
    file_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Likes',
  });
  return Likes;
};