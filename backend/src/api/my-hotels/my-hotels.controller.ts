import { Request, Response } from 'express'
import { createHotelService, getMyHotelsService, getHotelByIdService, updateHotelService } from './my-hotels.service'
import { HotelType } from '../../shared/types'
import { logger } from '../../services/logger.service'

export async function createHotel(req: Request, res: Response) {
    try {
        const userId = req.userId
        const imageFiles = req.files as Express.Multer.File[]
        const newHotel: HotelType = req.body
        const hotel = await createHotelService(newHotel, userId, imageFiles)
        res.status(201).send(hotel)
    } catch (err) {
        logger.error('Error creating hotel: ', err)
        res.status(500).json({ message: 'Something went wrong' })
    }
}

export async function getMyHotels(req: Request, res: Response) {
    try {
        const userId = req.userId
        const hotels = await getMyHotelsService(userId)
        res.json(hotels)
    } catch (err) {
        logger.error('Error fetching hotels: ', err)
        res.status(500).json({ message: 'Error fetching hotels' })
    }
}

export async function getHotelById(req: Request, res: Response) {
    try {
        const hotelId = req.params.hotelId.toString()
        const userId = req.userId
        const hotel = await getHotelByIdService(hotelId, userId)
        res.json(hotel)
    } catch (err) {
        logger.error('Error fetching hotel: ', err)
        res.status(500).json({ message: 'Error fetching hotel' })
    }
}

export async function updateHotel(req: Request, res: Response) {
    try {
        const userId = req.userId
        const hotelId = req.params.hotelId
        console.log('hotelId', hotelId);

        const updatedHotel: HotelType = req.body
        const imageFiles = req.files as Express.Multer.File[]
        console.log('imageFiles', imageFiles);

        const hotel = await updateHotelService(hotelId, updatedHotel, userId, imageFiles)
        res.status(201).json(hotel)
    } catch (err) {
        logger.error('Something went wrong: ', err)
        res.status(500).json({ message: 'Something went wrong!' })
    }
}
