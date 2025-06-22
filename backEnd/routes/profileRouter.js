const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');

router.get('/data/:id', profileController.getProfile);         
router.put('/post/:id', profileController.createOrUpdateProfile); 

module.exports = router;
