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
          type: DataTypes.STRING,
        },
        userId: {type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            }
        }
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
