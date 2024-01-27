import cloudinary from 'cloudinary'
import Hotel from '../../models/hotel'
import { HotelType } from '../../shared/types'

export async function createHotelService(newHotel: HotelType, userId: string, imageFiles: Express.Multer.File[]): Promise<HotelType> {
    try {
        const imageUrls = await uploadImages(imageFiles)

        newHotel.imageUrls = imageUrls
        newHotel.lastUpdated = new Date()
        newHotel.userId = userId

        const hotel = new Hotel(newHotel)
        return await hotel.save()
    } catch (error) {
        throw new Error('Failed to create hotel: ' + error)
    }
}

export async function getMyHotelsService(userId: string): Promise<HotelType[]> {
    try {
        return await Hotel.find({ userId: userId })
    } catch (error) {
        throw new Error('Failed to fetch hotels: ' + error)
    }
}

export async function getHotelByIdService(hotelId: string, userId: string): Promise<HotelType | null> {
    try {
        return await Hotel.findOne({ _id: hotelId, userId: userId })
    } catch (error) {
        throw new Error('Failed to fetch hotel: ' + error)
    }
}

export async function updateHotelService(hotelId: string, updatedHotel: HotelType, userId: string, imageFiles: Express.Multer.File[]): Promise<HotelType | null> {
    try {
        updatedHotel.lastUpdated = new Date()

        const hotel = await Hotel.findOneAndUpdate(
            { _id: hotelId, userId: userId },
            updatedHotel,
            { new: true }
        )

        if (!hotel) throw new Error('Failed to find and update hotel')

        const updatedImagesUrls = await uploadImages(imageFiles)
        hotel.imageUrls = [...updatedImagesUrls, ...(updatedHotel.imageUrls || [])]

        return await hotel.save()
    } catch (error) {
        throw new Error('Failed to update hotel: ' + error)
    }
}

async function uploadImages(imageFiles: Express.Multer.File[]): Promise<string[]> {
    try {
        const uploadPromises = imageFiles.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString('base64')
            let dataURI = 'data:' + image.mimetype + ';base64,' + b64
            const res = await cloudinary.v2.uploader.upload(dataURI)
            return res.url
        })

        return await Promise.all(uploadPromises)
    } catch (error) {
        throw new Error('Failed to upload images: ' + error)
    }
}
