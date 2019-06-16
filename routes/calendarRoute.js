const express = require('express');

const router = express.Router();

const isLoggedIn = require('../middleware/isLoggedin');

const getController = require('../controllers/calendar/get');

const newEventPostController = require('../controllers/calendar/event/post');
const deleteEventPostController = require('../controllers/calendar/event/delete');

router.get(
  '/',
    isLoggedIn,
    getController
);

router.post(
  '/new',
    isLoggedIn, 
    newEventPostController
);
router.get(
  '/delete',
    isLoggedIn,
    deleteEventPostController
);

module.exports = router;
