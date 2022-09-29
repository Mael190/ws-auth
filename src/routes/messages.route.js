const express = require('express');
const router = express.Router();
const controller = require('../controllers/messages.controller')

router.get('/', controller.findAll);
router.post('/', controller.create);
router.delete('/:messageId', controller.delete);

module.exports = router;
