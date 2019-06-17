const express = require('express');

const router = express.Router();

const isLoggedIn = require('../middleware/isLoggedin');

const getController = require('../controllers/players/get');

const deletePlayerPostController = require('../controllers/players/delete');

router.get(
  '/',
    isLoggedIn,
    getController
);
router.get(
  '/delete',
    isLoggedIn,
    deletePlayerPostController
);

module.exports = router;
