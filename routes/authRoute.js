const express = require('express');
const router = express.Router();

const registerGetController = require('./../controllers/auth/register/user/get');
const loginGetController = require('../controllers/auth/login/user/get');
const coachLoginGetController = require('../controllers/auth/login/coach/get');

const registerPostController = require('./../controllers/auth/register/user/post');
const loginPostController = require('../controllers/auth/login/user/post');
const coachLoginPostController = require('../controllers/auth/login/coach/post');

// Get Controllers
router.get(
  '/register',
  registerGetController
);
router.get(
  '/login',
  loginGetController
);
router.get(
  '/login/coach',
  coachLoginGetController
);

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
  '/login/coach',
  coachLoginPostController
);

module.exports = router;
