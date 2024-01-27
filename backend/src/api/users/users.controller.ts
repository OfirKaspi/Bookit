import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { logger } from '../../services/logger.service'
import { getUserById, registerNewUser } from './users.service'

export async function getMe(req: Request, res: Response) {
    const userId = req.userId

    try {
        const user = await getUserById(userId)
        if (!user) return res.status(400).send({ message: 'User not found' })
        res.json(user)
    } catch (err) {
        logger.error('Something went wrong: ', err)
        res.status(500).send({ message: 'Something went wrong' })
    }
}

export async function registerUser(req: Request, res: Response) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({ message: errors.array() })
        const token = await registerNewUser(req.body)

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 86400000
        })

        return res.status(200).send({ message: 'User registered OK!' })
    } catch (err) {
        logger.error('Something went wrong: ', err)
        res.status(500).send({ message: 'Something went wrong' })
    }
}
