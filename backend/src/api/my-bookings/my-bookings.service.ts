import Hotel from '../../models/hotel'
import { HotelType } from '../../shared/types'

export async function getHotelsWithUserBookings(userId: string): Promise<HotelType[]> {
    try {
        const hotels = await Hotel.find({
            bookings: { $elemMatch: { userId: userId } }
        })

        return hotels.map((hotel) => {
            const userBookings = hotel.bookings.filter((booking) => booking.userId === userId)
            return {
                ...hotel.toObject(),
                bookings: userBookings
            }
        })
    } catch (err) {
        throw new Error('Failed to get user bookings')
    }
}
