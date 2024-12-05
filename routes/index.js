const router = require('express').Router();


//router.use('/', require('./swagger'));

//router.use('/users', require('./users'));
router.use('/products', require('./products'));
router.use('/orders', require('./orders'));
router.use('/reviews', require('./reviews'));


module.exports = router;