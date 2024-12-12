const router = require('express').Router();
const ordersController = require('../controllers/orders');
const { orderValidationRules, validate } = require('../middleware/validate');

/* CRUD routes */
router.get('/', ordersController.getAll);
router.get('/:id', ordersController.getSingle);
router.post('/',  orderValidationRules, validate, ordersController.createOrder);
router.put('/:id',  orderValidationRules, validate, ordersController.updateOrder);
router.delete('/:id', ordersController.deleteOrder);
router.get('/products/:id', ordersController.getProductsForOrder);
router.get('/user/:userId', ordersController.getOrdersByUser);

module.exports = router;