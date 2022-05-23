'use strict';

const express = require('express');

const router = express.Router();

const dreamController = require('../controller/DreamController');

router.get('/filter', dreamController.findAllCategory);
router.get('/filter/count', dreamController.countDreamFilter);
router.get('/filter/result', dreamController.findAllDreamFilter);
router.get('/result/:dreamId', dreamController.findOneDreamById);
router.get('/search', dreamController.findAllDreamSearch);
router.get('/popularity', dreamController.findPopularityKeword);

module.exports = router;
