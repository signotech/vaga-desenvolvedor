'use strict';

const express = require('express');

const controller = require('./apiController');
const { clientRules } = require('./validator');
const validate = require('../../middlewares/validate');
const asyncHandler = require('../../helpers/asyncHandler');

const router = express.Router();

router.get('/', asyncHandler(controller.index));
router.post('/', validate(clientRules), asyncHandler(controller.create));

router.delete('/bulk', asyncHandler(controller.bulkDestroy));

router.get('/:id', asyncHandler(controller.show));
router.put('/:id', validate(clientRules), asyncHandler(controller.update));
router.patch(
  '/:id',
  asyncHandler(controller.loadForPatch),
  validate(clientRules),
  asyncHandler(controller.update),
);
router.delete('/:id', asyncHandler(controller.destroy));

module.exports = router;
