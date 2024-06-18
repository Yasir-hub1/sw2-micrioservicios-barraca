const express = require('express');
const router = express.Router();
const especieController = require('../controllers/especieController.js');

router.post('/especies', especieController.createEspecie);
router.get('/especies', especieController.getEspecies);
router.post('/especies/:id', especieController.getEspecieById);
router.put('/especies/:id', especieController.updateEspecie);

module.exports = router;
