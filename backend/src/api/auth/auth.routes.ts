import express from 'express';
import { login, logout, validateToken } from './auth.controller';
import { check } from 'express-validator';
import { verifyToken } from '../../middleware/auth';

const router = express.Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password with more than 6 characters required').isLength({ min: 6 }),
], login);

router.post('/logout', logout);

router.get('/validate-token', verifyToken, validateToken)

export default router;
