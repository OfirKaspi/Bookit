import { useMutation, useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { fetchMyHotelById, updateMyHotelById } from "../api-client"
import { ManageHotelForm } from "../forms/ManageHotelForm/ManageHotelForm"

export const EditHotel = () => {
    const { hotelId } = useParams()

    const { data: hotel } = useQuery('fetchMyHotelById', () => fetchMyHotelById(hotelId || ''), {
        enabled: !!hotelId,
    })

    const { mutate, isLoading } = useMutation(updateMyHotelById, {
        onSuccess: async () => {
            // showToast({ message: 'Hotel Saved!', type: 'SUCCESS' })
        },
        onError: () => {
            // showToast({ message: 'Error Saving Hotl', type: 'ERROR' })
        }
    })

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData)
    }

    return (
        <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
    )
}