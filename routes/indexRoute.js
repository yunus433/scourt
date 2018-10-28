const express = require('express');
const router = express.Router();

const indexController = require('./../controllers/index/index');

router.get(
  '/',
  indexController
)

module.exports = router;

