import express, { Request, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import path, { join } from 'path'
import { v2 as cloudinary } from 'cloudinary'

import userRoutes from './api/users'
import authRoutes from './api/auth/auth.routes'
import hotelRoutes from './api/hotels/hotels.routes'
import myHotelRoutes from './api/my-hotels'
import bookingRoutes from './api/my-bookings/my-bookings.routes'
import { logger } from './services/logger.service'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)

logger.info('server.ts loaded...')

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use(express.static(path.join(__dirname, '../../frontend/dist')))

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/my-hotels', myHotelRoutes)
app.use('/api/hotels', hotelRoutes)
app.use('/api/my-bookings', bookingRoutes)

app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
})

app.listen(7000, () => {
    logger.info('server running on localhost:7000')
})