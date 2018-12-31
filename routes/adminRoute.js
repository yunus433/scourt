const express = require('express');
const router = express.Router();

// Get controllers

const loginRouteController = require('../controllers/admin/login');
const indexRouteController = require('../controllers/admin/index');

const mainRouteGetController = require('../controllers/admin/main');
const coachesRouteController = require('../controllers/admin/coaches');

// Post controllers

const loginPostController = require('../controllers/admin/loginPost');
const isAdmin = require('../middleware/isAdmin');
const deleteAdmin = require('../middleware/deleteAdmin');

const newCoachPostController = require('../controllers/auth/register/coach/post');

router.get(
  '/',
  indexRouteController
);
router.get(
  '/login',
  loginRouteController
);
router.get(
  '/main',
  mainRouteGetController
)
router.get(
  '/exit',
  deleteAdmin
);
router.get(
  '/coaches',
  isAdmin,
  coachesRouteController
);

router.post(
  '/login',
  loginPostController
);
router.post(
  '/coaches/new',
  isAdmin,
  newCoachPostController
);

module.exports = router;
