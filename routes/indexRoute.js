const express = require('express');
const router = express.Router();
const multer  = require('multer')


const upload = multer({ dest: 'public/res/uploads/' })

const helpController = require('../controllers/index/help/index');
const leagueController = require('./../controllers/index/leagues/index');
const leaguesDetailsController = require('./../controllers/index/leagues/details');
const playersController = require('./../controllers/index/players/index');
const playersDetailsController = require('./../controllers/index/players/details');
const teamsController = require('./../controllers/index/schools/index');
const teamsDetailsControlller = require('./../controllers/index/schools/details');
const indexController = require('./../controllers/index/index/index');
const registerGetController = require('./../controllers/index/auth/register/get');

const registerPostController = require('./../controllers/index/auth/register/post');

// Get Controllers
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
router.get(
  '/auth/register',
  registerGetController
);


// Post Controllers
router.post(
  '/auth/register',
  upload.single('profile'),
  registerPostController
)

module.exports = router;

