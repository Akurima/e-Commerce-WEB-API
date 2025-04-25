const { Model, DataTypes } = require("sequelize");

class User extends Model {
  toJSON() {
    const values = { ...this.get() };
    delete values.password; // Ocultar contraseña en respuestas JSON
    return values;
  }
  static initModel(sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
        adress: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        order: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM("buyer", "admin"),
          allowNull: false,
          defaultValue: "buyer",
        },
      },
      {
        sequelize,
        modelName: "user", // Nombre del modelo en singular y en minúscula.
      },
    );
    return User;
  }
}

module.exports = User;
