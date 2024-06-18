const express = require('express');
const router = express.Router();
const romaneoController = require('../controllers/romaneoController.js');

router.post('/romaneo', romaneoController.store);

module.exports = router;
