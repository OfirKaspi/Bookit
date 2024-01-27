import { Request, Response } from 'express'
import { getHotelsWithUserBookings } from './my-bookings.service'
import { logger } from '../../services/logger.service'

export async function getMyBookings(req: Request, res: Response) {
    try {
        const results = await getHotelsWithUserBookings(req.userId)
        res.status(200).send(results)
    } catch (err) {
        logger.error('Failed to get user bookings', err)
        res.status(500).send({ message: 'Failed to get user bookings' })
    }
}
