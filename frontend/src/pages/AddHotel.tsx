import { useMutation } from "react-query"
import { ManageHotelForm } from "../forms/ManageHotelForm/ManageHotelForm"
import * as apiClient from '../api-client'
import { useAppContext } from "../contexts/AppContext"

export const AddHotel = () => {

    const { showToast } = useAppContext()

    const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
        onSuccess: async () => {
            showToast({ message: 'Hotel Saved!', type: 'SUCCESS' })
        },
        onError: () => {
            showToast({ message: 'Error Saving Hotl', type: 'ERROR' })
        }
    })

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData)
    }

    return (
        <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
    )
}