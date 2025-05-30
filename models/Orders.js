const { Model, DataTypes } = require("sequelize");

class Orders extends Model {
  static initModel(sequelize) {
    Orders.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        orderStatus: {
          type: DataTypes.BOOLEAN,
        },
        customerId: {type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
        productId: {type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: "products",
                key: "id",
            },
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "orders", // nombre del modelo en singular y en minúscula.
      },
    );

    return Orders;
  }
}

module.exports = Orders;
