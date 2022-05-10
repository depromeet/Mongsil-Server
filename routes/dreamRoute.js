'use strict';

const express = require('express');

const router = express.Router();

const dreamCtrl = require('../controller/dreamCtrl');

router.get('/filter', dreamCtrl.findAllCategory);
// router.get('/filter/result');
// router.get('/filter/:category');

module.exports = router;
