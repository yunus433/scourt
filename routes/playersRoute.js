const express = require('express');
const router = express.Router();

const indexController = require('./../controllers/players/index');
const detailsController = require('./../controllers/players/details');

router.get(
  '/',
  indexController
);
router.get(
  '/details',
  detailsController
);

module.exports = router;
