const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, uploadProductImage } = require('../Controllers/ProductController');
const { upload } = require('../Utils/cloudinary');

const validateProduct = [
    body('name').trim().notEmpty().withMessage('Product name is required'),
    body('category').trim().notEmpty().withMessage('Category is required'),
    body('qty').trim().notEmpty().withMessage('Quantity is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
];

const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
};

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', validateProduct, handleValidation, createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.post('/:id/upload', upload.single('image'), uploadProductImage);

module.exports = router;
