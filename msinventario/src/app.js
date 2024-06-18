const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importar el middleware cors

const romaneoRoutes = require('./routes/romaneoRoute.js');
const especieRoutes = require('./routes/especieRoute.js');
const productoRoutes = require('./routes/productoRoute.js');

const app = express();
const port = process.env.PORT || 3000;

// Configurar el middleware cors
app.use(cors());

// Configurar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar rutas
app.use('/api', romaneoRoutes);
app.use('/api', especieRoutes);
app.use('/api', productoRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
