import { useQuery } from "react-query"
import { fetchCurrentUser } from "../api-client"
import { BookingForm } from "../forms/BookingForm/BookingForm"

export const Booking = () => {
    const { data: currentUser } = useQuery(
        'detchCurrentUser',
        fetchCurrentUser
    )

    return (
        <div className="grid md:grid-cols-[1fr_2fr]">
            <div className="bg-green-200">BOOKING DETAILS SUMMARY</div>
            {currentUser && <BookingForm currentUser={currentUser} />}
        </div>
    )
}