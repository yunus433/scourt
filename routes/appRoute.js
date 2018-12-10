const express = require('express');
const router = express.Router();
const multer  = require('multer')


const upload = multer({ dest: 'public/res/uploads/' });

const isLoggedIn = require('./../middleware/isLoggedin');

const indexGetController = require('./../controllers/app/indexGetController');
const registerGetController = require('./../controllers/app/auth/register/get');
const validateGetController = require('./../controllers/app/auth/validate/get');
const loginGetController = require('./../controllers/app/auth/login/get');
const dashboardGetController = require('./../controllers/app/main/dashboard/get');
const coachLoginGetController = require('./../controllers/app/coach/login/get');
const coachDashboardGetController = require('./../controllers/app/coach/dashboard/get');

const registerPostController = require('./../controllers/app/auth/register/post');
const loginPostController = require('./../controllers/app/auth/login/post');
const validatePostController = require('./../controllers/app/auth/validate/post');
const coachLoginPostController = require('./../controllers/app/coach/login/post');

// Get Controllers
router.get(
  '/',
  indexGetController
);
router.get(
  '/register',
  registerGetController
);
router.get(
  '/validate', 
  isLoggedIn,
  validateGetController
);
router.get(
  '/login',
  loginGetController
);
router.get(
  '/dashboard',
  isLoggedIn,
  dashboardGetController
);
router.get(
  '/coachlogin',
  coachLoginGetController
);
router.get(
  '/coachDashboard',
  coachDashboardGetController
)

// Post Controllers
router.post(
  '/register',
  registerPostController
);
router.post(
  '/login',
  loginPostController
);
router.post(
  '/validate',
  upload.single('profile'),
  isLoggedIn,
  validatePostController
);
router.post(
  '/coachLogin',
  coachLoginPostController
);

module.exports = router;

