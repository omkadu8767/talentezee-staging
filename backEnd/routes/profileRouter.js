const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');

router.get('/', profileController.getProfile);         
router.post('/', profileController.createOrUpdateProfile); 

module.exports = router;
