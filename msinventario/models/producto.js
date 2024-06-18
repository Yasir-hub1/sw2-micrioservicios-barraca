'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Producto.belongsTo(models.Romaneo, { foreignKey: 'romaneoId' });
      Producto.belongsTo(models.Especie, { foreignKey: 'especieId' });
      Producto.hasOne(models.DetalleRomaneo, { foreignKey: 'id' });
    }
  }
  Producto.init({
    codigo: DataTypes.STRING,
    espesor: DataTypes.FLOAT,
    ancho: DataTypes.FLOAT,
    largo: DataTypes.FLOAT,
    cantidad: DataTypes.INTEGER,
    cantidad_pies: DataTypes.FLOAT,
    estado: DataTypes.STRING,
    cantidad_ingresada: DataTypes.INTEGER,
    romaneoId: DataTypes.INTEGER,
    especieId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Producto',
  });
  return Producto;
};