const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to save user preferences
router.post('/preferences', userController.savePreferences);

// Route to get user preferences
router.get('/preferences', userController.getPreferences);

// Additional routes can be added here

module.exports = router;