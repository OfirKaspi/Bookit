import { useQuery } from "react-query"
import { fetchMyBookings } from "../services/hotel.service"
import { Loader } from "../cmps/Loader"
import { useAppContext } from "../contexts/AppContext"
import { Link, useNavigate } from "react-router-dom"
import { fetchCurrentUser } from "../services/user.service"

export const MyBookings = () => {
    const { data: hotels } = useQuery('fetchMyBookings', fetchMyBookings)
    const { data: currentUser } = useQuery('detchCurrentUser', fetchCurrentUser)
    const { isLoggedIn } = useAppContext()
    const navigate = useNavigate()

    if (!isLoggedIn) navigate('/sign-in')

    if (!hotels) return <Loader />

    if (currentUser && hotels.length === 0) return (
        <div className="flex flex-col gap-4">
            <p className="flex flex-col gap-3">
                <span>Dear <span className="text-blue-600">{currentUser?.lastName} {currentUser?.firstName}</span>,</span>
                <span>
                    Welcome to our platform! We've noticed that you haven't booked any hotels for a vacation yet.
                    Now is the perfect time to plan your next getaway and discover amazing accommodations tailored to your preferences.
                    Booking your first hotel is simple and quick, allowing you to explore new destinations with ease.
                    Whether you're seeking a tranquil retreat, an adventurous escape, or a relaxing beachfront stay,
                    our platform offers a diverse selection of options to suit your travel needs.
                </span>
                <span>
                    Take the first step towards your dream vacation by browsing through our wide range of accommodations.
                    From cozy retreats nestled in nature to luxurious resorts offering unparalleled comfort, there's something for every traveler.
                    Don't miss out on the chance to create unforgettable memories and immerse yourself in new experiences.
                </span>
                <span>
                    Start planning your next adventure today by booking your first hotel with us.
                    Our team is here to assist you at every stage of your journey, ensuring a seamless and enjoyable booking process.
                </span>
                <span>Happy travels!</span>
                <span><span className="text-blue-600">Bookit</span> Team</span>
            </p>
            <Link to="/search" className="flex rounded bg-blue-600 text-white w-fit self-end text-xl font-bold p-2 hover:bg-blue-500">Book Hotels</Link>
        </div>
    )

    return (
        <div className="space-y-5">
            <h1 className="text-3xl font-bold">My Bookings</h1>
            {hotels.map((hotel => (
                <div key={hotel._id} className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5">
                    <div className="lg:w-full lg:h-[250px]">
                        <img src={hotel.imageUrls[0]} className="w-full h-full object-cover object-center" />
                    </div>
                    <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
                        <div className="text-2xl font-bold">
                            {hotel.name}
                            <div className="text-xs font-normal">
                                {hotel.city}, {hotel.country}
                            </div>
                        </div>
                        {hotel.bookings.map((booking, idx) => (
                            <div key={idx} className="border-t pt-4 mr-4">
                                <div>
                                    <span className="font-bold mr-2">Dates:</span>
                                    <span>
                                        {new Date(booking.checkIn).toDateString()} -
                                        {new Date(booking.checkOut).toDateString()}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-bold mr-2">Guests:</span>
                                    <span>
                                        {booking.adultCount} adults {booking.childCount ? `& ${booking.childCount} children` : ''}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )))}
        </div>
    )
}