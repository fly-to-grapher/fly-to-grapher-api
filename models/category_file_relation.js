'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category_file_relation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category_file_relation.init({
    category_id: DataTypes.INTEGER,
    file_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Category_file_relation',
  });
  return Category_file_relation;
};