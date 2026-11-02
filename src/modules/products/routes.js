'use strict';

const express = require('express');

const controller = require('./controller');
const { productRules } = require('./validator');
const asyncHandler = require('../../helpers/asyncHandler');

const router = express.Router();

router.get('/', asyncHandler(controller.index));
router.get('/new', controller.createForm);
router.post('/bulk-delete', asyncHandler(controller.bulkDelete));
router.post('/', productRules, asyncHandler(controller.create));

router.get('/:id', asyncHandler(controller.show));
router.get('/:id/edit', asyncHandler(controller.editForm));
router.put('/:id', productRules, asyncHandler(controller.update));
router.delete('/:id', asyncHandler(controller.destroy));

module.exports = router;
