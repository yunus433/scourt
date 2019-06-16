const express = require('express');
const multer  = require('multer');

const router = express.Router();

const upload = multer({dest: './public/res/uploads/'});

const isLoggedIn = require('../middleware/isLoggedin');

const registerGetController = require('./../controllers/auth/register/user/get');
const loginGetController = require('../controllers/auth/login/get');
const validateGetController = require('../controllers/auth/validate/get');
const validateProfileGetController = require('../controllers/auth/validate/profileGet');

const registerPostController = require('./../controllers/auth/register/user/post');
const loginPostController = require('../controllers/auth/login/post');
const validatePostController = require('../controllers/auth/validate/post');
const validateProfilePostController = require('../controllers/auth/validate/profilePost');

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
  '/validate', 
  isLoggedIn,
  validateGetController
);
router.get(
  '/validate/profile',
  isLoggedIn,
  validateProfileGetController
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
  '/validate',
  isLoggedIn,
  validatePostController
);
router.post(
  '/validate/profile',
  upload.single('profile'),
  isLoggedIn,
  validateProfilePostController
);

module.exports = router;
