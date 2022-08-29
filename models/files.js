'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Files extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Files.belongsToMany(models.Categories, {
        through: 'category_file',
        foreignKey: 'file_id'
      });
      Files.belongsToMany(models.Tags, {
        through: 'tag_file',
        foreignKey: 'file_id'
      });
      Files.hasMany(models.Save, {
        foreignKey: 'id'
      })
      Files.hasMany(models.Likes, {
        foreignKey: 'id'
      })
      Files.belongsTo(models.Users,{
        foreignKey: 'user_id'
      })
    }
  }
  Files.init({
    file_name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    location: DataTypes.STRING,
    file_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Files',
  });
  return Files;
};