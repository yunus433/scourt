const express = require('express');
const router = express.Router();
const multer  = require('multer');

const upload = multer({dest: './public/res/uploads/'});

const isLoggedIn = require('./../middleware/isLoggedin');

// Validate Controllers
const validateGetController = require('../controllers/app/validate/user/get');
const validatePostController = require('./../controllers/app/validate/user/post');
const validateProfilePostController = require('../controllers/app/validate/user/profilePost');
const coachValidateGetController = require('../controllers/app/validate/coach/get');
const coachValidatePostController = require('../controllers/app/validate/coach/post');
const coachValidateProfilePostController = require('../controllers/app/validate/coach/profilePost');

// Dashboard Controllers
const dashboardGetController = require('./../controllers/app/dashboard/user/get');
const coachDashboardGetController = require('../controllers/app/dashboard/coach/get');

// Edit Controllers
const editGetController = require('../controllers/app/edit/user/get');
const editPostController = require('../controllers/app/edit/user/post');
const editProfilePostController = require('../controllers/app/edit/user/profilePost');
const editPasswordPostController = require('../controllers/app/edit/user/passwordPost');

// Team Controllers
const teamPageDashboardGetController = require('../controllers/app/teams/dashboard');
const teamPageMessagesGetController = require('../controllers/app/teams/messages');
const teamPageCalendarGetController = require('../controllers/app/teams/calendar');
const teamCreatePostController = require('../controllers/app/teams/new/post');
const teamJoinPostController = require('../controllers/app/teams/join/post');
const teamEditGetController = require('../controllers/app/teams/edit/get');
const teamEditPostController = require('../controllers/app/teams/edit/post');
const teamProfileEditPostController = require('../controllers/app/teams/edit/profilePost');
const newTeamEventPostController = require('../controllers/app/teams/event/post');
const deleteTeamEventPostController = require('../controllers/app/teams/event/delete');


// Get Controllers
router.get(
  '/validate', 
  isLoggedIn,
  validateGetController
);
router.get(
  '/validate/coach',
  isLoggedIn,
  coachValidateGetController
);

router.get(
  '/dashboard',
  isLoggedIn,
  dashboardGetController
);
router.get(
  '/dashboard/coach',
  isLoggedIn,
  coachDashboardGetController
);

router.get(
  '/edit',
  isLoggedIn,
  editGetController
);
// router.get('/coach/edit')

router.get(
  '/team',
  isLoggedIn,
  teamPageDashboardGetController
);
router.get(
  '/team/edit',
  isLoggedIn,
  teamEditGetController
);
router.get(
  '/team/messages',
  isLoggedIn,
  teamPageMessagesGetController
);
router.get(
  '/team/calendar',
  isLoggedIn,
  teamPageCalendarGetController
);


// Post Controllers
router.post(
  '/validate',
  isLoggedIn,
  validatePostController
);
router.post(
  '/validate/image',
  upload.single('profile'),
  isLoggedIn,
  validateProfilePostController
);
router.post(
  '/coach/validate',
  isLoggedIn,
  coachValidatePostController
);
router.post(
  '/coach/validate/image',
  upload.single('profile'),
  isLoggedIn,
  coachValidateProfilePostController
);
router.post(
  '/edit',
  isLoggedIn,
  editPostController
);
router.post(
  '/edit/image',
  upload.single('profile'),
  isLoggedIn,
  editProfilePostController
);
router.post(
  '/edit/password',
  isLoggedIn,
  editPasswordPostController
);
router.post(
  '/team/new',
  isLoggedIn,
  teamCreatePostController
);
router.post(
  '/team/join',
  isLoggedIn,
  teamJoinPostController
);
router.post(
  '/team/edit',
  isLoggedIn,
  teamEditPostController
);
router.post(
  '/team/edit/profile',
  upload.single('teamPhoto'),
  isLoggedIn,
  teamProfileEditPostController
);
router.post(
  '/team/calendar/new',
  isLoggedIn, 
  newTeamEventPostController
);
router.get(
  '/team/calendar/delete',
  isLoggedIn,
  deleteTeamEventPostController
);



module.exports = router;

