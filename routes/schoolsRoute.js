const express = require('express');
const router = express.Router();

const indexController = require('./../controllers/schools/index');
const detailsControlller = require('./../controllers/schools/details');

router.get(
  '/',
  indexController
);
router.get(
  '/details', 
  detailsControlller
)

module.exports = router;
