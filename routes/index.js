const express = require('express');
const router = express.Router();
const barController = require('../controllers/barController');
const authController = require('../controllers/authController');

router.get('/', barController.renderIndex);
router.get('/search', barController.handleSearch);

router.get('/login', authController.login);
router.get('/login/return',
  authController.login,
  authController.loginCallback
);
router.get('/logout', authController.logout);

// handle user clicking on going button
router.post('/going/:id',
  authController.isLoggedIn,
  barController.addGoing
);

module.exports = router;
