const { Model, DataTypes } = require("sequelize");

class Product extends Model {
  static initModel(sequelize) {
    Product.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
        },
        content: {
          type: DataTypes.TEXT,
        }, 
          description: {
          type: DataTypes.STRING,
        },
           photo: {
          type: DataTypes.STRING,
        },
           price: {
          type: DataTypes.STRING,
        }, 
          stock: {
          type: DataTypes.BIGINT,
        },
      },
      {
        sequelize,
        modelName: "product", // Nombre del modelo en singular y en minúscula.
      },
    );

    return Product;
  }
}

module.exports = Product;
