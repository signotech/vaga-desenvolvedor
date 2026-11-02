'use strict';

const express = require('express');

const controller = require('./controller');
const { loginRules } = require('./validator');
const validate = require('../../middlewares/validate');
const { requireAuth, redirectIfAuthenticated } = require('../../middlewares/auth');
const asyncHandler = require('../../helpers/asyncHandler');

const router = express.Router();

router.get('/login', redirectIfAuthenticated, controller.loginForm);
router.post(
  '/login',
  redirectIfAuthenticated,
  validate(loginRules),
  asyncHandler(controller.login),
);
router.post('/logout', requireAuth, asyncHandler(controller.logout));

module.exports = router;
