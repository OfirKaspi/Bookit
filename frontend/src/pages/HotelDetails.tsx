import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { fetchHotelById } from "../api-client"
import { AiFillStar } from "react-icons/ai"

export const HotelDetails = () => {
    const { hotelId } = useParams()
    const { data: hotel } = useQuery('fetchHotelById', () =>
        fetchHotelById(hotelId as string), {
        enabled: !!hotelId
    })

    if (!hotel) return <></>

    return (
        <div className="space-y-6">
            <div>
                <span className="flex ">
                    {Array.from({ length: hotel.starRating }).map(() => (
                        <AiFillStar className="fill-yellow-400" />
                    ))}
                </span>
            </div>
        </div>
    )
}