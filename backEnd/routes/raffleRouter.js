// routes/raffleRoutes.js
const express = require('express');
const router = express.Router();
const raffleController = require('../controller/raffleController');

router.get('/status', raffleController.getRaffleStatus);
router.post('/award', raffleController.awardRaffleTicket);

module.exports = router;