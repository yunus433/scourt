const express = require('express');

const router = express.Router();

const isLoggedIn = require('../middleware/isLoggedin');

const getController = require('../controllers/tactics/get');

const savePostController = require('../controllers/tactics/save');
const deletePlayerPostController = require('../controllers/tactics/deletePlayer');
const deleteNotePostController = require('../controllers/tactics/deleteNote');
const deleteLinePostController = require('../controllers/tactics/deleteLine');

router.get(
  '/',
    isLoggedIn,
    getController
);

router.post(
  '/save',
    isLoggedIn,
    savePostController
);
router.get(
  '/deletePlayer',
    isLoggedIn,
    deletePlayerPostController
);
router.get(
  '/deleteNote',
    isLoggedIn,
    deleteNotePostController
);
router.get(
  '/deleteLine',
    isLoggedIn,
    deleteLinePostController
);

module.exports = router;
