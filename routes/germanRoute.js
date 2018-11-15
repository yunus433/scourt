const express = require('express');
const router = express.Router();

const helpController = require('../controllers/german/help/index');
const leagueController = require('./../controllers/german/leagues/index');
const leaguesDetailsController = require('./../controllers/german/leagues/details');
const playersController = require('./../controllers/german/players/index');
const playersDetailsController = require('./../controllers/german/players/details');
const teamsController = require('./../controllers/german/schools/index');
const teamsDetailsControlller = require('./../controllers/german/schools/details');
const indexController = require('./../controllers/german/index/index');

router.get(
  '/',
  indexController
)
router.get(
  '/teams',
  teamsController
);
router.get(
  '/teams/details', 
  teamsDetailsControlller
);
router.get(
  '/spieler',
  playersController
);
router.get(
  '/spieler/details',
  playersDetailsController
);
router.get(
  '/ligen',
  leagueController
);
router.get(
  '/ligen/details',
  leaguesDetailsController
);
router.get(
  '/hilfe',
  helpController
);

module.exports = router;
