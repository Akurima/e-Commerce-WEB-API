const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE, // Ej: hack_academy_db
  process.env.DB_USERNAME, // Ej: root
  process.env.DB_PASSWORD, // Ej: root
  {
    host: process.env.DB_HOST, // Ej: 127.0.0.1
    dialect: process.env.DB_CONNECTION, // Ej: mysql
    logging: false, // Para que no aparezcan mensajes en consola.
  },
);

// Requerir todos los modelos:
const User = require("./User");
const Product = require("./Products");
const Category = require("./Category");
const Admin = require("./Admins")

// Inicializar todos los modelos:
User.initModel(sequelize);
Product.initModel(sequelize);
Category.initModel(sequelize);
Admin.initModel(sequelize);

// Establecemos relaciones:

 Category.hasMany(Product);
 Product.belongsTo(Category);


module.exports = {
  sequelize,
  User,
  Product,
  Category,
  Admin
};
