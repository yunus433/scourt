const express = require('express');
const router = express.Router();
const multer  = require('multer');

const upload = multer({ dest: 'public/res/uploads/' });

const isLoggedIn = require('./../middleware/isLoggedin');

const validateGetController = require('./../controllers/app/validate/get');
const coachValidateGetController = require('../controllers/app/coach/validate/get');
const dashboardGetController = require('./../controllers/app/dashboard/get');
const coachDashboardGetController = require('./../controllers/app/coach/dashboard/get');

const validatePostController = require('./../controllers/app/validate/post');
const coachValidatePostController = require('../controllers/app/coach/validate/post');

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

module.exports = router;

