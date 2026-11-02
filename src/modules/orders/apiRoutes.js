'use strict';

const express = require('express');

const controller = require('./apiController');
const { orderRules } = require('./validator');
const validate = require('../../middlewares/validate');
const asyncHandler = require('../../helpers/asyncHandler');

const router = express.Router();

router.use(controller.normalizePayload);

router.get('/', asyncHandler(controller.index));
router.post('/', validate(orderRules), asyncHandler(controller.create));

router.delete('/bulk', asyncHandler(controller.bulkDestroy));

router.get('/:id', asyncHandler(controller.show));
router.put('/:id', validate(orderRules), asyncHandler(controller.update));
router.patch(
  '/:id',
  asyncHandler(controller.loadForPatch),
  validate(orderRules),
  asyncHandler(controller.update),
);
router.delete('/:id', asyncHandler(controller.destroy));

module.exports = router;
