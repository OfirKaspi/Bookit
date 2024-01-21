import express, { Request, Response } from 'express'
import { verifyToken } from '../middleware/auth'
import Hotel from '../models/hotel'
import { HotelType } from '../shared/types'
import { asyncWrapper } from '../utils/asyncWrapper'

const router = express.Router()

router.get('/', verifyToken, asyncWrapper(async (req: Request, res: Response) => {
    const hotels = await Hotel.find({
        bookings: { $elemMatch: { userId: req.userId } }
    })

    const results = hotels.map((hotel) => {
        const userBookings = hotel.bookings.filter(
            (booking) => booking.userId === req.userId
        )

        const hotelWithUserBookings: HotelType = {
            ...hotel.toObject(),
            bookings: userBookings
        }

        return hotelWithUserBookings
    })

    res.status(200).send(results)
}))

export default router