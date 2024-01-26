import express from 'express';
import { check } from 'express-validator';
import * as HotelController from './hotels.controller';
import { verifyToken } from '../../middleware/auth';

const router = express.Router();

router.get('/search', HotelController.search);

router.get('/', HotelController.getAllHotels);

router.get('/:id', [
    check('id').notEmpty().withMessage('Hotel ID is required')
], HotelController.getHotel);

router.post('/:hotelId/bookings/payment-intent', verifyToken, HotelController.createBookingPaymentIntent);

router.post('/:hotelId/bookings', verifyToken, HotelController.createBooking);

export default router;
