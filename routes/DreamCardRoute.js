const express = require('express');
const DreamCardController = require('../controller/DreamCardController');
const router = express.Router();

router.post('/', DreamCardController.saveDreamCard);

module.exports = router;
