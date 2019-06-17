const express = require('express');

const router = express.Router();

const getController = require('../controllers/trainings/get');

const postController = require('../controllers/trainings/post');
const updatePostController = require('../controllers/trainings/update');
const deletePostController = require('../controllers/trainings/delete');

const isLoggedIn = require('../middleware/isLoggedin');

router.get(
  '/',
    isLoggedIn,
    getController
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

module.exports = router;