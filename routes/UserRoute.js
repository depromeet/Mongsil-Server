const express = require('express');
const UserController = require('../controller/UserController');
const router = express.Router();

router.get('/findAll', UserController.findAllUser);

router.post('/save', UserController.saveUser);
module.exports = router;
