const express = require('express');
const router = express.Router();

const isLoggedIn = require('../middleware/isLoggedin');

const indexGetController = require('../controllers/index/get');
const dashboardGetController = require('../controllers/index/dashboard/get');

const indexPostController = require('../controllers/index/post');
const createPostController = require('../controllers/index/dashboard/create/post');
const joinPostController = require('../controllers/index/dashboard/join/post');

router.get(
  '/',
    indexGetController
);
router.get(
  '/dashboard',
    isLoggedIn,
    dashboardGetController
);

router.post(
  '/post',
    indexPostController
);
router.post(
  '/create',
    isLoggedIn,
    createPostController
);
router.post(
  '/join',
    isLoggedIn,
    joinPostController
);

module.exports = router;
