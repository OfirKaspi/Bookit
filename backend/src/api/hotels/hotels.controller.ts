import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Stripe from 'stripe';
import { logger } from '../../services/logger.service';
import * as hotelService from './hotels.service';

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

// GOOD!
export async function search(req: Request, res: Response) {
    try {
        const response = await hotelService.searchHotels(req);
        res.json(response)
    } catch (err) {
        logger.error('Failed to search hotels: ', err);
        res.status(500).send({ message: 'Failed to search hotels' });
    }
}

// GOOD!
export async function getAllHotels(req: Request, res: Response) {
    try {
        const hotels = await hotelService.getAllHotels();
        res.json(hotels);
    } catch (err) {
        logger.error('Error fetching hotels: ', err);
        res.status(500).send({ message: 'Error fetching hotels' });
    }
}

// GOOD!
export async function getHotel(req: Request, res: Response) {
    try {
        const hotelId = req.params.id;
        const hotel = await hotelService.getHotelById(hotelId);
        res.json(hotel);
    } catch (err) {
        logger.error('Error fetching hotel: ', err);
        res.status(500).send({ message: 'Error fetching hotel' });
    }
}

// GOOD!
export async function createBookingPaymentIntent(req: Request, res: Response) {
    try {
        console.log('here 1');

        const response = await hotelService.createBookingPaymentIntent(req);
        console.log('here 2');
        res.json(response);
    } catch (err) {
        logger.error('Error creating payment intent: ', err);
        res.status(500).send({ message: 'Error creating payment intent' });
    }
}

export async function createBooking(req: Request, res: Response) {
    try {
        await hotelService.createBooking(req);
        res.status(200).send()
    } catch (err) {
        logger.error('Error creating booking: ', err);
        res.status(500).send({ message: 'Error creating booking' });
    }
}
