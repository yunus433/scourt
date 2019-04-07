const express = require('express');
const router = express.Router();
const multer  = require('multer');

const upload = multer({dest: './public/res/uploads/'});

const isLoggedIn = require('./../middleware/isLoggedin');

const indexGetController = require('../controllers/de/index');

// Validate Controllers
const validateGetController = require('../controllers/de/validate/get');
const validatePostController = require('./../controllers/de/validate/post');
const validateProfilePostController = require('../controllers/de/validate/profilePost');

// Dashboard Controllers
const dashboardGetController = require('../controllers/de/dashboard/get');

// Edit Controllers
const editGetController = require('../controllers/de/edit/get');
const editPostController = require('../controllers/de/edit/post');
const editProfilePostController = require('../controllers/de/edit/profilePost');
const editPasswordGetController = require('../controllers/de/edit/passwordGet');
const editPasswordPostController = require('../controllers/de/edit/passwordPost');

// Team Controllers
const teamPageDashboardGetController = require('../controllers/de/teams/dashboard');
const teamPageMessagesGetController = require('../controllers/de/teams/messages');
const teamPageCalendarGetController = require('../controllers/de/teams/calendar');
const teamPageVideosGetController = require('../controllers/de/teams/videos');
const teamCreatePostController = require('../controllers/de/teams/new/post');
const teamJoinPostController = require('../controllers/de/teams/join/post');
const teamEditGetController = require('../controllers/de/teams/edit/get');
const teamEditPostController = require('../controllers/de/teams/edit/post');
const teamProfileEditPostController = require('../controllers/de/teams/edit/profilePost');
const newTeamEventPostController = require('../controllers/de/teams/event/post');
const deleteTeamEventPostController = require('../controllers/de/teams/event/delete');
const teamAddVideoGetController = require('../controllers/de/teams/videos/get');
const teamEditNamePostController = require('../controllers/de/teams/videos/changeNamePost');
const teamDeleteVideoPostController = require('../controllers/de/teams/videos/deleteVideo');
const commentsGetController = require('../controllers/de/teams/videos/comments');
const commentPostContoller = require('../controllers/de/teams/videos/commentPost');

router.get(
  '/',
  indexGetController
);

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
  '/team/videos/delete',
  isLoggedIn,
  teamDeleteVideoPostController
);
router.get(
  '/team/videos/comments/',
  isLoggedIn,
  commentsGetController
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
  '/team/videos/upload',
  upload.single('video'),
  isLoggedIn,
  teamAddVideoGetController
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

module.exports = router;

