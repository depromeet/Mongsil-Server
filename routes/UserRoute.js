const express = require('express');
const UserController = require('../controller/UserController');
const router = express.Router();

router.get('/findAll', UserController.findAllUser);
router.post('/checkUser', UserController.checkUser);
router.delete('/expire', UserController.deleteUser);
router.post('/save', UserController.saveUser);
module.exports = router;
