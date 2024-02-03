import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { fetchHotelById } from "../services/hotel.service"
import { AiFillStar } from "react-icons/ai"
import { GuestInfoForm } from "../forms/GuestInfoForm/GuestInfoForm"
import { Loader } from "../cmps/Loader"
// import { BookNowButton } from "../cmps/BookNowButton"

export const HotelDetails = () => {
    const { hotelId } = useParams()
    const { data: hotel } = useQuery('fetchHotelById', () =>
        fetchHotelById(hotelId || ''), {
        enabled: !!hotelId
    })

    if (!hotel) return <Loader />

    return (
        <div className="space-y-6">
            <div>
                <span className="flex justify-between items-center">
                    <div>
                        <h3 className="text-3xl font-bold mb-2">{hotel.name}</h3>
                        <div className="flex items-center">
                            <span className="mr-2">{hotel.city}, {hotel.country}</span>
                            {Array.from({ length: hotel.starRating }).map((num) => (
                                <AiFillStar key={num} className="fill-yellow-400" />
                            ))}
                        </div>
                    </div>
                    {/* <BookNowButton /> */}
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {hotel.imageUrls.map((image) => (
                    <div key={image} className="h-[300px]">
                        <img src={image} alt={hotel.name} className="rounded-md w-full h-full object-cover object-center" />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-6 gap-2">
                {hotel.facilities.map((facility, idx) => (
                    <div key={idx} className="border border-slate-300 rounded-sm p-3">
                        {facility}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
                <div className="whitespace-pre-line">{hotel.description}</div>
                <div className="h-fit">
                    <GuestInfoForm pricePerNight={hotel.pricePerNight} hotelId={hotel._id} />
                </div>
            </div>
        </div>
    )
}