const express = require('express');
const router = express.Router();

const helpController = require('../controllers/index/help/index');
const leagueController = require('./../controllers/index/leagues/index');
const leaguesDetailsController = require('./../controllers/index/leagues/details');
const playersController = require('./../controllers/index/players/index');
const playersDetailsController = require('./../controllers/index/players/details');
const teamsController = require('./../controllers/index/schools/index');
const teamsDetailsControlller = require('./../controllers/index/schools/details');
const indexController = require('./../controllers/index/index/index');

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

