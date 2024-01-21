import { useQuery } from "react-query"
import { createPaymentIntent, fetchHotelById } from "../services/hotel.service"
import { fetchCurrentUser } from "../services/user.service"
import { BookingForm } from "../forms/BookingForm/BookingForm"
import { useSearchContext } from "../contexts/SearchContext"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { BookingDetailsSummary } from "../cmps/BookingDetailsSummary"
import { useAppContext } from "../contexts/AppContext"
import { Elements } from "@stripe/react-stripe-js"
import { Loader } from "../cmps/Loader"

export const Booking = () => {
    const { stripePromise } = useAppContext()
    const search = useSearchContext()
    const { hotelId } = useParams()

    const [numberOfNights, setNumberOfNights] = useState<number>(0)

    useEffect(() => {
        if (search.checkIn && search.checkOut) {
            const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
                (1000 * 60 * 60 * 24)
            setNumberOfNights(Math.ceil(nights))
        }
    }, [search.checkIn, search.checkOut])

    const { data: hotel } = useQuery('fetchHotelById', () =>
        fetchHotelById(hotelId as string),
        { enabled: !!hotelId }
    )

    const { data: paymentIntentDate } = useQuery('createPaymentIntent', () =>
        createPaymentIntent(hotelId as string, numberOfNights.toString()),
        { enabled: !!hotelId && numberOfNights > 0 }
    )

    const { data: currentUser } = useQuery(
        'detchCurrentUser',
        fetchCurrentUser
    )

    if (!hotel) return <Loader />

    return (
        <div className="grid md:grid-cols-[1fr_2fr] gap-4">
            <BookingDetailsSummary
                checkIn={search.checkIn}
                checkOut={search.checkOut}
                adultCount={search.adultCount}
                childCount={search.childCount}
                numberOfNights={numberOfNights}
                hotel={hotel}
            />
            {currentUser && paymentIntentDate && (
                <Elements stripe={stripePromise} options={{
                    clientSecret: paymentIntentDate.clientSecret
                }}>
                    <BookingForm currentUser={currentUser} paymentIntent={paymentIntentDate} />
                </Elements>
            )}
        </div>
    )
}