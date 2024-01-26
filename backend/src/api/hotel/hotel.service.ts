import { Request } from 'express';
import Hotel from '../../models/hotel';
import { BookingType, HotelSearchResponse } from '../../shared/types';
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_API_KEY as string)

// GOOD!
export const searchHotels = async (req: Request) => {
    try {
        const query = constructSearchQuery(req.query);

        let sortOption = {};
        switch (req.query.sortOption) {
            case 'starRating':
                sortOption = { starRating: -1 };
                break;
            case 'pricePerNightAsc':
                sortOption = { pricePerNight: 1 };
                break;
            case 'pricePerNightDesc':
                sortOption = { pricePerNight: -1 };
                break;
        }

        const pageSize = 5;
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : '1')
        const skip = (pageNumber - 1) * pageSize;
        const hotels = await Hotel.find(query).sort(sortOption).skip(skip).limit(pageSize);
        const total = await Hotel.countDocuments(query);

        const response: HotelSearchResponse = {
            data: hotels,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize)
            }
        };

        return response;
    } catch (err) {
        throw err
    }
}

// GOOD!
export const getAllHotels = async () => {
    try {
        const hotels = await Hotel.find().sort('-lastUpdated')
        return hotels;
    } catch (err) {
        throw err;
    }
}

// GOOD!
export const getHotelById = async (id: string) => {
    try {
        const hotel = await Hotel.findById(id);
        return hotel;
    } catch (err) {
        throw err;
    }
}

export const createBooking = async (req: Request) => {
    try {
        const paymentIntentId = req.body.paymentIntentId
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId as string)

        if (!paymentIntent) throw new Error('Payment intent not found')

        if (paymentIntent.metadata.hotelId !== req.params.hotelId ||
            paymentIntent.metadata.userId !== req.userId
        ) {
            throw new Error('Payment intent mismatch')
        }

        if (paymentIntent.status !== 'succeeded') {
            throw new Error(`Payment intent not succeeded. status ${paymentIntent.status}`)
        }

        const newBooking: BookingType = { ...req.body, userId: req.userId }

        const hotel = await Hotel.findOneAndUpdate(
            { _id: req.params.hotelId },
            { $push: { bookings: newBooking } }
        )

        if (!hotel) throw new Error('Hotel not found')

        await hotel.save()
    } catch (err) {
        throw err
    }
}

export const createBookingPaymentIntent = async (req: Request) => {
    try {
        const { numberOfNights } = req.body
        const hotelId = req.params.hotelId

        const hotel = await getHotelById(hotelId)
        if (!hotel) throw new Error

        const totalCost = hotel.pricePerNight * numberOfNights

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalCost * 100,
            currency: 'usd',
            metadata: {
                hotelId,
                userId: req.userId
            }
        })

        if (!paymentIntent.client_secret) throw new Error

        const response = {
            paymentIntentId: paymentIntent.id,
            clientSecret: paymentIntent.client_secret.toString(),
            totalCost
        }

        return response
    } catch (err) {
        throw err
    }
}

const constructSearchQuery = (queryParams: any) => {
    let constructedQuery: any = {}

    if (queryParams.destination) {
        constructedQuery.$or = [
            { city: new RegExp(queryParams.destination, "i") },
            { country: new RegExp(queryParams.destination, "i") },
        ]
    }

    if (queryParams.adultCount) {
        constructedQuery.adultCount = {
            $gte: parseInt(queryParams.adultCount),
        }
    }

    if (queryParams.childCount) {
        constructedQuery.childCount = {
            $gte: parseInt(queryParams.childCount),
        }
    }

    if (queryParams.facilities) {
        constructedQuery.facilities = {
            $all: Array.isArray(queryParams.facilities)
                ? queryParams.facilities
                : [queryParams.facilities],
        }
    }

    if (queryParams.types) {
        constructedQuery.type = {
            $in: Array.isArray(queryParams.types)
                ? queryParams.types
                : [queryParams.types],
        }
    }

    if (queryParams.stars) {
        const starRatings = Array.isArray(queryParams.stars)
            ? queryParams.stars.map((star: string) => parseInt(star))
            : parseInt(queryParams.stars)

        constructedQuery.starRating = { $in: starRatings }
    }

    if (queryParams.maxPrice) {
        constructedQuery.pricePerNight = {
            $lte: parseInt(queryParams.maxPrice).toString(),
        }
    }

    return constructedQuery
}