// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category);

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  foreignKey: 'tag_id',
  onDelete: 'CASCADE',
  through: {
    model: ProductTag,
  },
  as: 'Tag ID'

})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
  through: {
    model: ProductTag,
  },
  as:'Product ID',
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
