const express = require('express');
const router = express.Router();
const {
  getUserActivities,
  getUserStats,
  handleQuickAction
} = require('../controller/dashboardController');

router.get('/activities/:id', getUserActivities);
router.get('/stats/:id', getUserStats);
router.post('/quick-action', handleQuickAction);

module.exports = router;
