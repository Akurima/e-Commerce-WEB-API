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
const Article = require("./Article");
const Category = require("./Category");
const userAdmin = require("./userAdmin")

// Inicializar todos los modelos:
User.initModel(sequelize);
Article.initModel(sequelize);
Category.initModel(sequelize);
userAdmin.initModel(sequelize);

// Establecemos relaciones:

Category.hasMany(Article, { foreignKey: 'id' });
Article.belongsTo(Category, { foreignKey: 'id' });

User.hasMany(Article, {foreignkey: 'id'})
Article.belongsTo(User, {foreignkey: 'id'})


module.exports = {
  sequelize,
  User,
  Article,
};
