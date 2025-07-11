const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE || "api-ecomerce",
  process.env.DB_USERNAME || "root",
  process.env.DB_PASSWORD || "root",
  {
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_CONNECTION || "mysql",
    logging: false,
  },
);

// Requerir todos los modelos:
const User = require("./User");
const Products = require("./Products"); // ✅ ahora usamos el nombre plural
const Category = require("./Category");
const Admin = require("./Admins");

// Inicializar todos los modelos:
User.initModel(sequelize);
Products.initModel(sequelize);
Category.initModel(sequelize);
Admin.initModel(sequelize);

// Establecemos relaciones:
Category.hasMany(Products);
Products.belongsTo(Category);

module.exports = {
  sequelize,
  User,
  Products, // ✅ exportado en plural para coincidir con el controlador
  Category,
  Admin,
};
