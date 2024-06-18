const { Producto } = require('../../models');
const { getEspecie_By_Id } = require('./especieController');
const moment = require('moment');


// Crear un nuevo producto
const createProducto = async (req, res) => {
    try {
        const producto = await Producto.create(req.body);
        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los productos
const getProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll({
            order: [['id', 'ASC']]
          });
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un producto por ID
const getProductoById = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un producto por ID
const updateProducto = async (req, res) => {
    try {
        const [updated] = await Producto.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        const updatedProducto = await Producto.findByPk(req.params.id);
        res.status(200).json(updatedProducto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un producto por código y la especie asociada
const getProductoByCodigo = async (req, res) => {
    try {
        // Filtrar los productos por el código y obtener el producto con la mayor cantidad
        const producto = await Producto.findOne({
            where: { codigo: req.body.codigo_producto },
            order: [['cantidad', 'DESC']]
        });

        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Obtener la especie asociada
        const especie = await getEspecie_By_Id(producto.especieId);

        res.status(200).json({ producto, especie });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const actualizarCantidad = async (req, res) => {
    const { action, id_producto, cantidad_entrante, observacion } = req.body;
     console.log("ENTRANDO ",req.body)
    try {
      const producto = await Producto.findByPk(id_producto);
  
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
  
      let { espesor, ancho, largo, cantidad } = producto;
      const especie = producto.especieId; // Ajusta según tu modelo
      let tipo = '';
  
      if (action === 'INC') {
        cantidad = Number(cantidad) + Number(cantidad_entrante);
        tipo = 'INCREMENTO';
        if (cantidad > 0) {
          producto.estado = 'Disponible';
        }
      }else if (action === "DEC") {
        cantidad = Number(cantidad) - Number(cantidad_entrante); 
        tipo = 'DECREMENTO';
        if (cantidad === 0) {
            producto.estado = 'Agotado';
        }
      }
  
      const cantidad_pies = parseFloat(((espesor * ancho * cantidad * largo) / 12).toFixed(2));
  
      producto.cantidad = Number(cantidad);
      producto.cantidad_pies = cantidad_pies;
    
      await producto.save();
  
     
    
  
      res.json(producto);
    } catch (error) {
      console.error(error);
      res.status(422).json({ error: 'Error al actualizar la cantidad del producto' });
    }
  };
module.exports = {
    createProducto,
    getProductos,
    getProductoById,
    updateProducto,
    getProductoByCodigo,
    actualizarCantidad
};
