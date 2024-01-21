import express, { Request, Response } from 'express'
import multer from 'multer'
import cloudinary from 'cloudinary'
import Hotel from '../models/hotel'
import { verifyToken } from '../middleware/auth'
import { body } from 'express-validator'
import { HotelType } from '../shared/types'
import { asyncWrapper } from '../utils/asyncWrapper'

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
})

router.post(
    '/',
    verifyToken,
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('city').notEmpty().withMessage('City is required'),
        body('country').notEmpty().withMessage('Country is required'),
        body('descripton').notEmpty().withMessage('Descripton is required'),
        body('type').notEmpty().withMessage('Hotel type is required'),
        body('pricePerNight').notEmpty().isNumeric().withMessage('Price per night is required'),
        body('facilities').notEmpty().isArray().withMessage('Facilities is required'),
    ],
    upload.array('imageFiles', 6),
    asyncWrapper(async (req: Request, res: Response) => {
        const imageFiles = req.files as Express.Multer.File[]
        const newHotel: HotelType = req.body

        // 1. upload the images to cloudinary
        const imageUrls = await uploadImages(imageFiles)

        // 2. if upload was successful, add the URLs to new hotel
        newHotel.imageUrls = imageUrls
        newHotel.lastUpdated = new Date()
        newHotel.userId = req.userId

        // 3. save the new hotel in our db
        const hotel = new Hotel(newHotel)
        await hotel.save()

        // 4. return a 201 status
        res.status(201).send(hotel)
    })
)

router.get(
    '/',
    verifyToken,
    asyncWrapper(async (req: Request, res: Response) => {
        const hotels = await Hotel.find({ userId: req.userId })
        res.json(hotels)
    })
)

router.get(
    '/:id',
    verifyToken,
    asyncWrapper(async (req: Request, res: Response) => {
        const id = req.params.id.toString()
        const hotel = await Hotel.findOne({ _id: id, userId: req.userId })
        res.json(hotel)
    })
)

router.put(
    '/:hotelId',
    verifyToken,
    upload.array('imageFiles'),
    asyncWrapper(async (req: Request, res: Response) => {
        const updatedHotel: HotelType = req.body
        updatedHotel.lastUpdated = new Date()

        const hotel = await Hotel.findOneAndUpdate(
            {
                _id: req.params.hotelId,
                userId: req.userId,
            },
            updatedHotel,
            { new: true }
        )

        if (!hotel) return res.status(404).json({ message: 'Hotel not found' })

        const files = req.files as Express.Multer.File[]
        const updatedImagesUrls = await uploadImages(files)

        hotel.imageUrls = [...updatedImagesUrls, ...(updatedHotel.imageUrls || [])]

        await hotel.save()
        res.status(201).json(hotel)
    })
)

const uploadImages = async (imageFiles: Express.Multer.File[]) => {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString('base64')
        let dataURI = 'data:' + image.mimetype + 'base64,' + b64
        const res = await cloudinary.v2.uploader.upload(dataURI)
        return res.url
    })

    const imageUrls = await Promise.all(uploadPromises)
    return imageUrls
}

export default router
