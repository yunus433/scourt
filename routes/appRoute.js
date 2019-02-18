const express = require('express');
const router = express.Router();
const multer  = require('multer');

const upload = multer({dest: './public/res/uploads/'});

const isLoggedIn = require('./../middleware/isLoggedin');

// Validate Controllers
const validateGetController = require('../controllers/app/validate/get');
const validatePostController = require('./../controllers/app/validate/post');
const validateProfilePostController = require('../controllers/app/validate/profilePost');

// Dashboard Controllers
const dashboardGetController = require('../controllers/app/dashboard/get');

// Edit Controllers
const editGetController = require('../controllers/app/edit/get');
const editPostController = require('../controllers/app/edit/post');
const editProfilePostController = require('../controllers/app/edit/profilePost');
const editPasswordGetController = require('../controllers/app/edit/passwordGet');
const editPasswordPostController = require('../controllers/app/edit/passwordPost');

// Team Controllers
const teamPageDashboardGetController = require('../controllers/app/teams/dashboard');
const teamPageMessagesGetController = require('../controllers/app/teams/messages');
const teamPageCalendarGetController = require('../controllers/app/teams/calendar');
const teamPageVideosGetController = require('../controllers/app/teams/videos');
const teamPageTrainingsGetController = require('../controllers/app/teams/training');

const teamCreatePostController = require('../controllers/app/teams/new/post');
const teamJoinPostController = require('../controllers/app/teams/join/post');

const teamEditGetController = require('../controllers/app/teams/edit/get');
const teamEditPostController = require('../controllers/app/teams/edit/post');
const teamProfileEditPostController = require('../controllers/app/teams/edit/profilePost');

const newTeamEventPostController = require('../controllers/app/teams/event/post');
const deleteTeamEventPostController = require('../controllers/app/teams/event/delete');

const teamAddVideoGetController = require('../controllers/app/teams/videos/get');
const teamAddVideoPostController = require('../controllers/app/teams/videos/post');
const teamEditNamePostController = require('../controllers/app/teams/videos/changeNamePost');
const teamDeleteVideoPostController = require('../controllers/app/teams/videos/deleteVideo');
const commentsGetController = require('../controllers/app/teams/videos/comments');
const commentPostContoller = require('../controllers/app/teams/videos/commentPost');

const trainingPostController = require('../controllers/app/teams/trainings/post');
const trainingUpdatePostController = require('../controllers/app/teams/trainings/update');
const trainingDeletePostController = require('../controllers/app/teams/trainings/delete');

// Get Controllers
router.get(
  '/validate', 
  isLoggedIn,
  validateGetController
);
router.get(
  '/dashboard',
  isLoggedIn,
  dashboardGetController
);
router.get(
  '/edit',
  isLoggedIn,
  editGetController
);
router.get(
  '/edit/password',
  isLoggedIn,
  editPasswordGetController
);

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
router.get(
  '/team/videos',
  isLoggedIn,
  teamPageVideosGetController
);
router.get(
  '/team/videos/new',
  isLoggedIn,
  teamAddVideoGetController
);
router.get(
  '/team/videos/delete',
  isLoggedIn,
  teamDeleteVideoPostController
);
router.get(
  '/team/videos/comments/',
  isLoggedIn,
  commentsGetController
);
router.get(
  '/team/trainings',
  isLoggedIn,
  teamPageTrainingsGetController
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
router.post(
  '/team/videos/new',
  upload.single('video'),
  isLoggedIn,
  teamAddVideoPostController
);
router.post(
  '/team/videos/edit/name',
  isLoggedIn,
  teamEditNamePostController
);
router.post(
  '/team/video/comment/new',
  isLoggedIn,
  commentPostContoller
);
router.post(
  '/team/trainings/add',
  isLoggedIn,
  trainingPostController
);
router.get(
  '/team/trainings/update',
  isLoggedIn,
  trainingUpdatePostController
);
router.get(
  '/team/trainings/delete',
  isLoggedIn,
  trainingDeletePostController
);

module.exports = router;

