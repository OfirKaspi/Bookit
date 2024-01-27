import User from '../../models/user'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import { logger } from '../../services/logger.service'

export async function getUserById(userId: string) {
    try {
        return await User.findById(userId).select('-password')
    } catch (err) {
        logger.error('Failed to get user by ID: ', err)
        throw new Error('Failed to get user')
    }
}

export async function registerNewUser(userData: any) {
    try {
        const user = new User(userData)
        await user.save()

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: '1d' }
        )

        return token
    } catch (err) {
        logger.error('Failed to register new user: ', err)
        throw new Error('Failed to register user')
    }
}
