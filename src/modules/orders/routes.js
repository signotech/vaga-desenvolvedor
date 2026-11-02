'use strict';

const express = require('express');

const controller = require('./controller');
const { orderRules } = require('./validator');
const validate = require('../../middlewares/validate');
const asyncHandler = require('../../helpers/asyncHandler');

const router = express.Router();

router.get('/', asyncHandler(controller.index));
router.get('/new', asyncHandler(controller.createForm));
router.post('/bulk-delete', asyncHandler(controller.bulkDelete));
router.post('/', validate(orderRules), asyncHandler(controller.create));

router.get('/:id', asyncHandler(controller.show));
router.get('/:id/edit', asyncHandler(controller.editForm));
router.put('/:id', validate(orderRules), asyncHandler(controller.update));
router.delete('/:id', asyncHandler(controller.destroy));

module.exports = router;
