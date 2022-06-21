const express = require('express');
const DreamCardController = require('../controller/DreamCardController');
const router = express.Router();

router.get('/:diaryId', DreamCardController.getDreamCard);
router.post('/', DreamCardController.saveDreamCard);
router.put('/', DreamCardController.updateDreamCard);
router.delete('/', DreamCardController.deleteDreamCard);
router.post('/list', DreamCardController.getDreamCardList);
module.exports = router;
