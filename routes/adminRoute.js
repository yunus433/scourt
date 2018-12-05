const express = require('express');
const router = express.Router();

// Get controllers

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
const teamsDeleteRouteController = require('../controllers/admin/teams/teamsDelete');
const teamsEditRouteController = require('../controllers/admin/teams/teamsEdit');

const leaguesRouteController = require('../controllers/admin/leagues/leagues');
const leaguesAddRouteController = require('../controllers/admin/leagues/leaguesAdd');
const leaguesDeleteRouteController = require('../controllers/admin/leagues/leagueDelete');
const leaguesEditRouteController = require('../controllers/admin/leagues/leaguesEdit');

const matchesRouteController = require('../controllers/admin/matches/matches');
const matchesAddRouteController = require('../controllers/admin/matches/matchesAdd');
const matchesDeleteRouteController = require('../controllers/admin/matches/matchesDelete');

// Post controllers

const loginPostController = require('../controllers/admin/loginPost');
const isAdmin = require('../middleware/isAdmin');
const deleteAdmin = require('../middleware/deleteAdmin');

const newPlayerPostController = require('../controllers/admin/players/newPlayerPost');
const editPlayersPostController = require('../controllers/admin/players/editPlayerPost');

const newTeamPostController = require('../controllers/admin/teams/newTeamPost');
const teamsPlayersPostController = require('../controllers/admin/teams/playersAddPost');
const editTeamsPostController = require('../controllers/admin/teams//editTeamPost');

const newLeaguePostController = require('../controllers/admin/leagues/newLeaguePost');
const editLeaguesPostController = require('../controllers/admin/leagues/editLeaguesPost');

const newMatchPostController = require('../controllers/admin/matches/newMatchPost');

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
);
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
  '/teams/delete',
  isAdmin,
  teamsDeleteRouteController
);
router.get(
  '/teams/edit',
  isAdmin,
  teamsEditRouteController
)
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
router.get(
  '/leagues/delete',
  isAdmin,
  leaguesDeleteRouteController
);
router.get(
  '/leagues/edit',
  isAdmin,
  leaguesEditRouteController
);
router.get(
  '/matches',
  isAdmin,
  matchesRouteController
);
router.get(
  '/matches/new',
  isAdmin,
  matchesAddRouteController
);
router.get(
  '/matches/delete',
  isAdmin,
  matchesDeleteRouteController
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
router.post(
  '/teams/edit',
  isAdmin,
  editTeamsPostController
);
router.post(
  '/leagues/new',
  isAdmin,
  newLeaguePostController
);
router.post(
  '/leagues/edit',
  isAdmin,
  editLeaguesPostController
);
router.post(
  '/matches/new',
  isAdmin,
  newMatchPostController
);

module.exports = router;
