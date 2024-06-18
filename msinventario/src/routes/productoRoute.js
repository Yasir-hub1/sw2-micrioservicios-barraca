const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController.js');

router.post('/productos', productoController.createProducto);
router.get('/productos', productoController.getProductos);
router.get('/productos/:id', productoController.getProductoById);
router.put('/productos/:id', productoController.updateProducto);
router.post('/producto/codigo', productoController.getProductoByCodigo); // Nueva ruta para obtener el producto por código
router.post('/actualizar-cantidad', productoController.actualizarCantidad);

module.exports = router;
