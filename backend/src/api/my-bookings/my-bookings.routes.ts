import express from 'express'
import { getMyBookings } from './my-bookings.controller'
import { verifyToken } from '../../middleware/auth'

const router = express.Router()

router.get('/', verifyToken, getMyBookings)

export default router
