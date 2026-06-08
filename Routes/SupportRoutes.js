const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { createTicket, getAllTickets } = require('../Controllers/SupportController');

const validateTicket = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').isLength({ min: 20, max: 500 }).withMessage('Message must be 20–500 characters'),
];

const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
};

router.post('/', validateTicket, handleValidation, createTicket);
router.get('/', getAllTickets);

module.exports = router;
