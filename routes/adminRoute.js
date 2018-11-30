const express = require('express');
const router = express.Router();

const loginRouteController = require('../controllers/admin/login');
const mainRouteController = require('../controllers/admin/main');
const indexRouteController = require('../controllers/admin/index');
const playersRouteController = require('../controllers/admin/players/players');
const playersDeleteRouteController = require('../controllers/admin/players/playersDelete');
const playersEditRouteController = require('../controllers/admin/players/playersEdit');
const playersAddRouteController = require('../controllers/admin/players/playersAdd');
const teamsRouteController = require('../controllers/admin/teams/teams');
const teamsAddRouteController = require('../controllers/admin/teams/teamAdd');
const teamsPlayerAddRouteController = require('../controllers/admin/teams/playersAdd');
const leaguesRouteController = require('../controllers/admin/leagues/leagues');
const leaguesAddRouteController = require('../controllers/admin/leagues/leaguesAdd');

const loginPostController = require('../controllers/admin/loginPost');
const newPlayerPostController = require('../controllers/admin/players/newPlayerPost');
const editPlayersPostController = require('../controllers/admin/players/editPlayerPost');
const newTeamPostController = require('../controllers/admin/teams/newTeamPost');
const teamsPlayersPostController = require('../controllers/admin/teams/playersAddPost');

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
  isAdmin,
  playersAddRouteController
)
router.get(
  '/players/delete',
  isAdmin,
  playersDeleteRouteController
);
router.get(
  '/players/edit',
  isAdmin,
  playersEditRouteController
);
router.get(
  '/teams',
  isAdmin,
  teamsRouteController
);
router.get(
  '/teams/new',
  isAdmin,
  teamsAddRouteController
);
router.get(
  '/teams/addPlayer',
  isAdmin,
  teamsPlayerAddRouteController
);
router.get(
  '/leagues',
  isAdmin,
  leaguesRouteController
);
router.get(
  '/leagues/new',
  isAdmin,
  leaguesAddRouteController
);

router.post(
  '/login',
  loginPostController
);
router.post(
  '/players/new',
  isAdmin,
  newPlayerPostController
);
router.post(
  '/players/edit',
  isAdmin,
  editPlayersPostController
);
router.post(
  '/teams/new',
  isAdmin,
  newTeamPostController
);
router.post(
  '/teams/addPlayer',
  isAdmin,
  teamsPlayersPostController
);

module.exports = router;
