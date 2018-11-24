const express = require('express');
const router = express.Router();

const loginRouteController = require('../controllers/admin/login');
const mainRouteController = require('../controllers/admin/main');
const indexRouteController = require('../controllers/admin/index');
const playersRouteController = require('../controllers/admin/players/players');
const playersDeleteRouteController = require('../controllers/admin/players/playersDelete');
const playersEditRouteController = require('../controllers/admin/players/playersEdit');
const playersAddRouteController = require('../controllers/admin/players/playersAdd');
const leaguesRouteController = require('../controllers/admin/leagues/leagues');

const loginPostController = require('../controllers/admin/loginPost');
const newPlayerPostController = require('../controllers/admin/players/newPlayerPost');
const editPlayersPostController = require('../controllers/admin/players/editPlayerPost');

const isAdmin = require('../middleware/isAdmin');
const deleteAdmin = require('../middleware/deleteAdmin');

router.get(
  '/',
  indexRouteController
);
router.get(
  '/login',
  loginRouteController
);
router.get(
  '/exit',
  deleteAdmin
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
  '/players/new',
  playersAddRouteController
)
router.get(
  '/players/delete',
  playersDeleteRouteController
);
router.get(
  '/players/edit',
  isAdmin,
  playersEditRouteController
);
router.get(
  '/leagues',
  isAdmin,
  leaguesRouteController
);

router.post(
  '/login',
  loginPostController
);
router.post(
  '/players/new',
  newPlayerPostController
);
router.post(
  '/players/edit',
  editPlayersPostController
)

module.exports = router;
