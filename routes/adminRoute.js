const express = require('express');
const router = express.Router();

const loginRouteController = require('../controllers/admin/login');
const mainRouteController = require('../controllers/admin/main');
const indexRouteController = require('../controllers/admin/index');
const playersRouteController = require('../controllers/admin/players');

const loginPostController = require('../controllers/admin/loginPost');

router.get(
  '/',
  indexRouteController
);
router.get(
  '/login',
  loginRouteController
);
router.get(
  '/main',
  mainRouteController
);
router.get(
  '/players',
  playersRouteController
);

router.post(
  '/login',
  loginPostController
)

module.exports = router;
