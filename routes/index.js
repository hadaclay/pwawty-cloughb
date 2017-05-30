const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const authController = require('../controllers/authController');

router.get('/', searchController.renderIndex);
router.get('/search', searchController.handleSearch);

router.get('/login', authController.login);
router.get('/login/return',
  authController.login,
  authController.loginCallback
);

//router.post('/going') // handle user clicking on going button

module.exports = router;
