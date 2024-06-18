'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Romaneo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Romaneo.hasMany(models.Producto,{
        foreignKey: 'romaneoId'
      });
      Romaneo.hasMany(models.DetalleRomaneo,{
        foreignKey: 'romaneoId'
      })
    }
  }
  Romaneo.init({
    fecha_registro: DataTypes.DATE,
    fecha_entrega: DataTypes.DATE,
    descripcion: DataTypes.STRING,
    total_pie_cuadrado: DataTypes.FLOAT,
    estado: DataTypes.STRING,
    tipo_romaneo: DataTypes.STRING,
    cantidad_productos: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Romaneo',
  });
  return Romaneo;
};