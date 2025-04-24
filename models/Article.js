const { Model, DataTypes } = require("sequelize");

class Article extends Model {
  static initModel(sequelize) {
    Article.init(
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


        categoryId: {
          type: DataTypes.BIGINT.UNSIGNED,
          references: {
            model: 'categories', // este es el nombre de la tabla en la base de datos
            key: 'id'
          }
        }, 
          outstanding: {
          type: DataTypes.STRING,
    }
      },
      {
        sequelize,
        modelName: "article", // Nombre del modelo en singular y en minúscula.
      },
    );

    return Article;
  }
}

module.exports = Article;
