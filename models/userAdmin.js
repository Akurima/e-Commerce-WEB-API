const { Model, DataTypes } = require("sequelize");

class userAdmin extends Model {
  static initModel(sequelize) {
    userAdmin.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: {
          type: DataTypes.STRING,
        },
        lastname: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "useradmin", // Nombre del modelo en singular y en minúscula.
      },
    );
    return userAdmin;
  }
}

module.exports = userAdmin;
