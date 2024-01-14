import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { fetchMyHotelById } from "../api-client"
import { ManageHotelForm } from "../forms/ManageHotelForm/ManageHotelForm"

export const EditHotel = () => {
    const { hotelId } = useParams()

    const { data: hotel } = useQuery('fetchMyHotelById', () => fetchMyHotelById(hotelId || ''), {
        enabled: !!hotelId,
    })

    return (
        <ManageHotelForm hotel={hotel} />
    )
}