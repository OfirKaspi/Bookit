import express from 'express'
import { getMe, registerUser } from './users.controller'
import { verifyToken } from '../../middleware/auth'
import { body } from 'express-validator'

const router = express.Router()

const validateUserRegistration = [
    body('firstName').notEmpty().withMessage('First Name is required').isString(),
    body('lastName').notEmpty().withMessage('Last Name is required').isString(),
    body('email').notEmpty().withMessage('Email is required').isEmail(),
    body('password').notEmpty().withMessage('Password with 6 or more characters required').isLength({ min: 6 }),
]

router.get('/me', verifyToken, getMe)
router.post('/register', validateUserRegistration, registerUser)

export default router
