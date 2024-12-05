const router = require('express').Router();
const productsController = require('../controllers/products');
/*const { productValidationRules, validate } = require('../middleware/validate');

/* CRUD routes */
router.get('/', productsController.getAll);
router.get('/:id', productsController.getSingle);
router.post('/',  productsController.createProduct);
router.put('/:id',  productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;