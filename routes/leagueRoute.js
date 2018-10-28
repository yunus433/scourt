const express = require('express');
const router = express.Router();

const indexController = require('./../controllers/leagues/index');
const detailsController = require('./../controllers/leagues/details');

router.get(
  '/',
  indexController
);
router.get(
  '/details',
  detailsController
);

module.exports = router;
