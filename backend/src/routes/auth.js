const { Router } = require('express');
const controller = require('../controllers/auth');
const requireAuth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const rules = require('../validators/auth');

const router = Router();

router.post('/login', rules.login, validate, controller.login);
router.get('/me', requireAuth, controller.me);

module.exports = router;
