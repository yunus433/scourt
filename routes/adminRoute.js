const express = require('express');
const router = express.Router();

const loginRouteController = require('../controllers/admin/login');
const mainRouteController = require('../controllers/admin/main');
const indexRouteController = require('../controllers/admin/index');
const playersRouteController = require('../controllers/admin/players');
const deletePlayerGet = require('../controllers/admin/deletePlayerPost');
const playersEditRouteController = require('../controllers/admin/playersEdit');

const loginPostController = require('../controllers/admin/loginPost');
const newPlayerPostController = require('../controllers/admin/newPlayerPost');
const editPlayersPostController = require('../controllers/admin/editPlayerPost');

const isAdmin = require('../middleware/isAdmin');

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
  isAdmin,
  mainRouteController
);
router.get(
  '/players',
  isAdmin,
  playersRouteController
);
router.get(
  '/players/delete',
  deletePlayerGet
);
router.get(
  '/players/edit',
  isAdmin,
  playersEditRouteController
);

router.post(
  '/login',
  loginPostController
);
router.post(
  '/players',
  newPlayerPostController
);
router.post(
  '/players/edit',
  editPlayersPostController
)

module.exports = router;
