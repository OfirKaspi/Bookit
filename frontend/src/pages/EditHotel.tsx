import { useMutation, useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import { fetchMyHotelById, updateMyHotelById } from "../services/hotel.service"
import { ManageHotelForm } from "../forms/ManageHotelForm/ManageHotelForm"
import { useAppContext } from "../contexts/AppContext"
import { Loader } from "../cmps/Loader"

export const EditHotel = () => {
    const { hotelId } = useParams()
    const { showToast } = useAppContext()
    const { isLoggedIn } = useAppContext()
    const navigate = useNavigate()

    const { data: hotel } = useQuery('fetchMyHotelById', () => fetchMyHotelById(hotelId || ''), {
        enabled: !!hotelId,
    })

    const { mutate, isLoading } = useMutation(updateMyHotelById, {
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

    if (!hotel) return <Loader />

    return (
        <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
    )
}