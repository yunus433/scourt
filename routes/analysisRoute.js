const express = require('express');
const router = express.Router();
const multer  = require('multer');

const upload = multer({dest: './public/res/uploads/'});

const isLoggedIn = require('../middleware/isLoggedin');

const getController = require('../controllers/analysis/get');
const commentGetController = require('../controllers/analysis/comments');

const deletePostController = require('../controllers/analysis/delete');
const uploadPostController = require('../controllers/analysis/upload');
const teamEditNamePostController = require('../controllers/analysis/changeNamePost');
const commentPostController = require('../controllers/analysis/commentPost');

router.get(
  '/',
  isLoggedIn,
  getController
);
router.get(
  '/delete',
  isLoggedIn,
  deletePostController
);
router.get(
  '/comments',
  isLoggedIn,
  commentGetController
);

router.post(
  '/upload',
  upload.single('video'),
  isLoggedIn,
  uploadPostController
);
router.post(
  '/edit',
  isLoggedIn,
  teamEditNamePostController
);
router.post(
  '/comment',
  isLoggedIn,
  commentPostController
);

module.exports = router;
