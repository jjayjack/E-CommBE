const { Model, DataTypes, INTEGER, INET } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    id: {
      DataTypes: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      DataTypes: INTEGER,
      references: {
        model: 'Product',
        key: 'id',
      },
    },
    tag_id: {
      DataTypes: INTEGER,
      references: {
        model: 'Tag',
        key: 'id',
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
