import { useMutation } from "react-query"
import { ManageHotelForm } from "../forms/ManageHotelForm/ManageHotelForm"
import { useAppContext } from "../contexts/AppContext"
import { addMyHotel } from "../services/hotel.service"
import { useNavigate } from "react-router-dom"

export const AddHotel = () => {

    const { showToast, isLoggedIn } = useAppContext()
    const navigate = useNavigate()

    const { mutate, isLoading } = useMutation(addMyHotel, {
        onSuccess: async () => {
            showToast({ message: 'Hotel Saved!', type: 'SUCCESS' })
        },
        onError: () => {
            showToast({ message: 'Error Saving Hotel', type: 'ERROR' })
        }
    })

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData)
    }

    if (!isLoggedIn) navigate('/sign-in')

    return (
        <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
    )
}