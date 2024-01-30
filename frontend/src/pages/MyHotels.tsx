import { useQuery } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import { fetchMyHotels } from "../services/hotel.service"
import { BsBuilding, BsMap } from "react-icons/bs"
import { BiHotel, BiMoney, BiStar } from "react-icons/bi"
import { Loader } from "../cmps/Loader"
import { useAppContext } from "../contexts/AppContext"
import { fetchCurrentUser } from "../services/user.service"

export const MyHotels = () => {
    const { data: currentUser } = useQuery('detchCurrentUser', fetchCurrentUser)
    const { data: hotelData } = useQuery('fetchMyHotels', fetchMyHotels, {
        onError: () => {

        }
    })

    const { isLoggedIn } = useAppContext()
    const navigate = useNavigate()

    if (!isLoggedIn) navigate('/sign-in')

    if (!hotelData) return <Loader />

    if (hotelData.length === 0) return (
        <div className="flex flex-col gap-4">
            <p className="flex flex-col gap-3">
                <span>Dear <span className="text-blue-600">{currentUser?.lastName} {currentUser?.firstName}</span>,</span>
                <span>
                    Welcome to our platform! We noticed that you haven't added any hotels yet.
                    It's the perfect time to showcase your hospitality venture to our community of travelers.
                    Adding your first hotel is easy and takes just a few moments.
                    Simply click on the "Add Hotel" button to get started.
                    Whether it's a charming boutique stay, a cozy bed and breakfast, or a luxurious resort,
                    your property deserves to be discovered by travelers around the world.
                    Don't miss out on this opportunity to share your unique space and hospitality with our global audience.
                    We're here to support you every step of the way.
                </span>
                <span>Happy hosting!</span>
                <span><span className="text-blue-600">Bookit</span> Team</span>
            </p>
            <Link to="/add-hotel" className="flex rounded bg-blue-600 text-white w-fit self-end text-xl font-bold p-2 hover:bg-blue-500">Add Hotel</Link>
        </div>
    )

    return (
        <div className="space-y-5">
            <span className="flex justify-between">
                <h1 className="text-3xl font-bold">My Hotels</h1>
                <Link to="/add-hotel" className="flex rounded bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500">Add Hotel</Link>
            </span>
            <div className="grid grid-cols-1 gap-8">
                {hotelData.map((hotel) => (
                    <div key={hotel._id} className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5">
                        <h2 className="text-2xl font-bold">{hotel.name}</h2>
                        <div className="whitespace-pre-line">{hotel.description}</div>
                        <div className="grid grid-cols-5 gap-2">
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BsMap className="mr-1" />
                                {hotel.city}, {hotel.country}
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BsBuilding className="mr-1" />
                                {hotel.type}
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BiMoney className="mr-1" />
                                ${hotel.pricePerNight} per night
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BiHotel className="mr-1" />
                                {hotel.adultCount} adults, {hotel.childCount} children
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BiStar className="mr-1" />
                                {hotel.starRating} Star Rating
                            </div>
                        </div>
                        <span className="flex justify-end">
                            <Link
                                to={`/edit-hotel/${hotel._id}`}
                                className="flex rounded bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500">
                                View Details
                            </Link>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}