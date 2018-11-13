const express = require('express');
const router = express.Router();

const helpController = require('../controllers/english/help/index');
const leagueController = require('./../controllers/english/leagues/index');
const leaguesDetailsController = require('./../controllers/english/leagues/details');
const playersController = require('./../controllers/english/players/index');
const playersDetailsController = require('./../controllers/english/players/details');
const teamsController = require('./../controllers/english/schools/index');
const teamsDetailsControlller = require('./../controllers/english/schools/details');
const indexController = require('./../controllers/english/index/index');

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
  '/players',
  playersController
);
router.get(
  '/players/details',
  playersDetailsController
);
router.get(
  '/leagues',
  leagueController
);
router.get(
  '/leagues/details',
  leaguesDetailsController
);
router.get(
  '/help',
  helpController
);

module.exports = router;
