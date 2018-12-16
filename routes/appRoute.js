const express = require('express');
const router = express.Router();
const multer  = require('multer');

const upload = multer({dest: './public/res/uploads/'});

const isLoggedIn = require('./../middleware/isLoggedin');

const validateGetController = require('../controllers/app/validate/user/get');
const coachValidateGetController = require('../controllers/app/validate/coach/get');
const dashboardGetController = require('./../controllers/app/dashboard/user/get');
const coachDashboardGetController = require('../controllers/app/dashboard/coach/get');
const editGetController = require('../controllers/app/edit/user/get');
const teamPageGetController = require('../controllers/app/teams/teams');
const editTeamGetController = require('../controllers/app/teams/coach/editTeam');

const validatePostController = require('./../controllers/app/validate/user/post');
const coachValidatePostController = require('../controllers/app/validate/coach/post');
const coachCreateTeamPostController = require('../controllers/app/teams/coach/postNewTeam');
const editRoutePostController = require('../controllers/app/edit/user/post');
const editPasswordPostController = require('../controllers/app/edit/user/passwordPost');
const userJoinTeamPostController = require('../controllers/app/teams/user/joinTeamPost');
const editTeamPostController = require('../controllers/app/teams/coach/editTeamPostController');


// Get Controllers
router.get(
  '/validate', 
  isLoggedIn,
  validateGetController
);
router.get(
  '/coach/validate',
  isLoggedIn,
  coachValidateGetController
);

router.get(
  '/dashboard',
  isLoggedIn,
  dashboardGetController
);
router.get(
  '/coach/dashboard',
  isLoggedIn,
  coachDashboardGetController
);

router.get(
  '/edit',
  isLoggedIn,
  editGetController
);
router.get('/coach/edit')

router.get(
  '/team',
  isLoggedIn,
  teamPageGetController
);
router.get(
  '/team/edit',
  isLoggedIn,
  editTeamGetController
);


// Post Controllers
router.post(
  '/validate',
  upload.single('profile'),
  isLoggedIn,
  validatePostController
);
router.post(
  '/coach/validate',
  upload.single('profile'),
  isLoggedIn,
  coachValidatePostController
);
router.post(
  '/edit',
  upload.single('profile'),
  isLoggedIn,
  editRoutePostController
);
router.post(
  '/edit/password',
  isLoggedIn,
  editPasswordPostController
);
router.post(
  '/team/new',
  upload.single('teamPhoto'),
  isLoggedIn,
  coachCreateTeamPostController
);
router.post(
  '/team/join',
  isLoggedIn,
  userJoinTeamPostController
);
router.post(
  '/coach/team/edit',
  upload.single('teamPhoto'),
  isLoggedIn,
  editTeamPostController
);



module.exports = router;

