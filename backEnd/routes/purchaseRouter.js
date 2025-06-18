const express = require('express');
const router = express.Router();
const purchaseController = require('../controller/purchaseController');

router.post('/charge', purchaseController.chargeCard);

module.exports = router;