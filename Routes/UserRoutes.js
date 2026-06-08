const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { createUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser, forgotPassword } = require('../Controllers/UserController');

const validateUser = [
    body('firstname').trim().notEmpty().withMessage('First name is required'),
    body('lastname').trim().optional(),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const validateLogin = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
];

const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
};

router.post('/', validateUser, handleValidation, createUser);
router.post('/login', validateLogin, handleValidation, loginUser);
router.post('/forgot-password', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
], handleValidation, forgotPassword);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
