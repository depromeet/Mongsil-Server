const express = require('express');
const UserController = require('../controller/UserController');
const { User } = require('../models');
const router = express.Router();

// UserService
router.get('/', UserController.findAllUser);
router.post('/check', UserController.checkUser);
router.delete('/', UserController.deleteUser);
router.post('/', UserController.saveUser);

// UserDream
router.post('/dream', UserController.saveDream);
router.post('/dream-list', UserController.getSaveDreamList);
router.delete('/dream-list', UserController.deleteUserDream);
module.exports = router;
