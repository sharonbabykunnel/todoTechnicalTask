import { body } from 'epxress-validator';

export const loginValidation = [
    body('email')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .isString().withMessage('Password should be a valid string')
];

export const registerValidation = [
    body('name')
        .isString().withMessage('Name should be valid')
        .islength({ min: 2, max: 20 }).withMessage('Enter a valid name'),
    body('email')
        .isEmail('email').withMessage('Invalid email format')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 8, max: 16 }).withMessage('Password must be at least 8 or at most 16 characters long')
        .isString().withMessage('Password should be a valid string')
];
