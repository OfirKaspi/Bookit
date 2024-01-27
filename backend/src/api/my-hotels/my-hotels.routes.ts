import express from 'express'
import { createHotel, getMyHotels, getHotelById, updateHotel } from './my-hotels.controller'
import { verifyToken } from '../../middleware/auth'
import multer from 'multer'
import { body } from 'express-validator'

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
})

const validateHotelCreation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('country').notEmpty().withMessage('Country is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('type').notEmpty().withMessage('Hotel type is required'),
    body('pricePerNight').notEmpty().isNumeric().withMessage('Price per night is required and must be numeric'),
    body('facilities').notEmpty().isArray().withMessage('Facilities is required and must be an array')
]

router.get('/', verifyToken, getMyHotels)
router.post('/', verifyToken, validateHotelCreation, upload.array('imageFiles', 6), createHotel)
router.get('/:hotelId', verifyToken, getHotelById)
router.put('/:hotelId', verifyToken, upload.array('imageFiles'), updateHotel)

export default router
