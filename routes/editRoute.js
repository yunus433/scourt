const express = require('express');
const multer  = require('multer');

const router = express.Router();

const upload = multer({dest: './public/res/uploads/'});

const isLoggedIn = require('../middleware/isLoggedin');

const getController = require('../controllers/edit/get');
const passwordGetController = require('../controllers/edit/passwordGet');

const postController = require('../controllers/edit/post');
const profilePostController = require('../controllers/edit/profilePost');
const passwordPostController = require('../controllers/edit/passwordPost');
const teamPostController = require('../controllers/edit/team/post');
const teamProfilePostController = require('../controllers/edit/team/profilePost');

router.get(
  '/',
    isLoggedIn,
    getController
);
router.get(
  '/password',
    isLoggedIn,
    passwordGetController
);

router.post(
  '/',
    isLoggedIn,
    postController
);
router.post(
  '/profile',
    upload.single('profile'),
    isLoggedIn,
    profilePostController
);
router.post(
  '/password',
    isLoggedIn,
    passwordPostController
);
router.post(
  '/team',
    isLoggedIn,
    teamPostController
);
router.post(
  '/team/profile',
    upload.single('teamPhoto'),
    isLoggedIn,
    teamProfilePostController
);

module.exports = router;
