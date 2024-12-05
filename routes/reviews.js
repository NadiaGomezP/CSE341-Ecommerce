const router = require('express').Router();
const reviewsController = require('../controllers/reviews');
//const { reviewValidationRules, validate } = require('../middleware/validate');

/* CRUD routes */
router.get('/', reviewsController.getAll);
router.get('/:id', reviewsController.getSingle);
router.post('/',  reviewsController.createReview);
router.put('/:id',  reviewsController.updateReview);
router.delete('/:id', reviewsController.deleteReview);

module.exports = router;