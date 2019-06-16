const express = require('express');

const router = express.Router();

const isLoggedIn = require('../middleware/isLoggedin');

const getController = require('../controllers/players/get');

router.get(
  '/',
    isLoggedIn,
    getController
);

module.exports = router;
