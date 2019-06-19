const express = require('express');

const router = express.Router();

const getController = require('../controllers/trainings/get');
const newSessionGetController = require('../controllers/trainings/session/new');

const postController = require('../controllers/trainings/post');
const updatePostController = require('../controllers/trainings/update');
const deletePostController = require('../controllers/trainings/delete');
const newSessionPostController = require('../controllers/trainings/session/post');

const isLoggedIn = require('../middleware/isLoggedin');

router.get(
  '/',
    isLoggedIn,
    getController
);
router.get(
  '/session/new',
    isLoggedIn,
    newSessionGetController
);

router.post(
  '/add',
    isLoggedIn,
    postController
);
router.get(
  '/update',
    isLoggedIn,
    updatePostController
);
router.get(
  '/delete',
    isLoggedIn,
    deletePostController
);
router.post(
  '/session/new',
    isLoggedIn,
    newSessionPostController
);

module.exports = router;
