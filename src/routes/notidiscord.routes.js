const express = require('express');
const router = express.Router();

const notidiscordController = require('../controllers/notidiscord.controller.js');


router.post('/noti-discord', notidiscordController.notidiscord);






module.exports = router;