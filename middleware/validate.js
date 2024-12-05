// File: middleware/validation.js
const { body, validationResult } = require('express-validator');

const productValidationRules = () => {
    return [
        // Validate and sanitize fields for the 'products' collection.
        body('name')
            .notEmpty()
            .withMessage('Product name is required')
            .trim()
            .escape(),
        body('category')
            .notEmpty()
            .withMessage('Category is required')
            .trim()
            .escape(),
        body('description')
            .notEmpty()
            .withMessage('Description is required')
            .trim()
            .escape(),
        body('price')
            .isFloat({ gt: 0 })
            .withMessage('Price must be a number greater than 0'),
        body('stockQuantity')
            .isInt({ min: 0 })
            .withMessage('Stock quantity must be a non-negative integer'),
        body('brand')
            .notEmpty()
            .withMessage('Brand is required')
            .trim()
            .escape(),
        body('rating')
            .optional()
            .isFloat({ min: 0, max: 5 })
            .withMessage('Rating must be a number between 0 and 5'),
        body('dateAdded')
            .notEmpty()
            .withMessage('Date added is required')
            .trim()
            .escape(),
        body('isAvailable')
            .isBoolean()
            .withMessage('Availability must be true or false'),
    ];
};

const userValidationRules = () => {
    return [
        // Validate and sanitize fields for the 'users' collection.
        body('firstName')
            .notEmpty()
            .withMessage('Seller firstName is required')
            .trim()
            .escape(),
        body('lastName')
            .notEmpty()
            .withMessage('Seller lastName is required')
            .trim()
            .escape(),
        body('email')
            .notEmpty()
            .isEmail()
            .withMessage('Valid email is required')
            .normalizeEmail(),
        body('passwordHash')
            .notEmpty()
            .withMessage('Password is required')
            .trim()
            .escape(),
        body('address')
            .isInt({ min: 0 })
            .withMessage('Address is required'),
        body('createdAt')
            .notEmpty()
            .withMessage('A data is required')
            .trim()
            .escape(),
    ];
};




const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    productValidationRules,
    sellerValidationRules,
    validate
};