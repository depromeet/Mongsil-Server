const express = require("express");
const UserController = require("../controller/UserController");
const { User } = require("../models");
const router = express.Router();

router.get("/findAll", UserController.findAllUser);
router.post("/checkUser", UserController.checkUser);
router.post("/dropout", UserController.deleteUser);
router.post("/signUp", UserController.saveUser);
router.post("/saveDream", UserController.saveDream);
router.post("/dreamList", UserController.getSaveDreamList);
module.exports = router;
