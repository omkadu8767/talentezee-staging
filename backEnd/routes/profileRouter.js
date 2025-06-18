const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');

router.get('/data', profileController.getProfile);         
router.post('/post', profileController.createOrUpdateProfile); 

module.exports = router;
