'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetalleRomaneo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetalleRomaneo.belongsTo(models.Romaneo, { foreignKey: 'romaneoId' });
      DetalleRomaneo.belongsTo(models.Especie, { foreignKey: 'especieId' });
      DetalleRomaneo.belongsTo(models.Producto, { foreignKey: 'productoId' });
    }
  }
  DetalleRomaneo.init({
    ancho_total: DataTypes.FLOAT,
    pie_total: DataTypes.FLOAT,
    espesor_largo: DataTypes.STRING,
    lista_anchos: DataTypes.STRING,
    cantidad: DataTypes.INTEGER,
    romaneoId: DataTypes.INTEGER,
    especieId: DataTypes.INTEGER,
    productoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DetalleRomaneo',
  });
  return DetalleRomaneo;
};