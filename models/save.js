'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Save extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Save.belongsTo(models.Files, {
        foreignKey: 'file_id'
      })
      Save.belongsTo(models.Users, {
        foreignKey: 'user_id'
      })
    }
  }
  Save.init({
    user_id: DataTypes.INTEGER,
    file_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Save',
  });
  return Save;
};