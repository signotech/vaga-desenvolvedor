const { Router } = require('express');
const controller = require('../controllers/clientes');
const requireAuth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const bulkRules = require('../validators/bulk');
const rules = require('../validators/cliente');

const router = Router();

router.use(requireAuth);

router.get('/', controller.list);
router.get('/:id', rules.idParam, validate, controller.get);
router.post('/', rules.create, validate, controller.create);
router.post('/bulk-delete', bulkRules.bulkDelete, validate, controller.removeMany);
router.put('/:id', rules.update, validate, controller.update);
router.delete('/:id', rules.idParam, validate, controller.remove);

module.exports = router;
