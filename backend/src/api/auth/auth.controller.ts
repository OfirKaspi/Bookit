import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { loginUser } from './auth.service'
import { logger } from '../../services/logger.service'

export async function login(req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ message: errors.array() })

    const { email, password } = req.body
    try {
        const token = await loginUser(email, password)
        if (!token) return res.status(400).json({ message: 'Invalid Credentials' })

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 86400000
        })

        res.status(200).json({ message: 'Login successful' })
    } catch (err) {
        logger.error('Failed to login: ', err)
        res.status(500).send({ message: 'Failed to login' })
    }
}

export function logout(req: Request, res: Response) {
    res.cookie('auth_token', '', { expires: new Date(0) })
    res.send()
}

export async function validateToken(req: Request, res: Response) {
    res.status(200).send({ userId: req.userId })
}