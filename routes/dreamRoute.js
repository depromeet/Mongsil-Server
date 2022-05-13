'use strict';

const express = require('express');

const router = express.Router();

const dreamCtrl = require('../controller/DreamController');

router.get('/filter', dreamCtrl.findAllCategory);
router.get('/filter/count', dreamCtrl.countDreamFilter);
router.get('/filter/result', dreamCtrl.findAllDreamFilter);
router.get('/result/:dreamId', dreamCtrl.findOneDreamById);
router.get('/search', dreamCtrl.findAllDreamSearch);
router.get('/popularity', dreamCtrl.findPopularityKeword);

module.exports = router;
