const express = require('express');
const router = express.Router();

const indexController = require('../controllers/help/index');

router.get(
  '/',
  indexController
);

module.exports = router;
