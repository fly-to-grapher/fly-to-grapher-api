'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag_file_relation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tag_file_relation.init({
    tag_id: DataTypes.INTEGER,
    file_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tag_file_relation',
  });
  return Tag_file_relation;
};