
const express = require('express');
const router = express.Router();

const eventsController = require('../controllers/events.js')

router.get('/', eventsController.list);
router.post('/', eventsController.post)

module.exports = router;