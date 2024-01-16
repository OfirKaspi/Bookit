import { useQuery } from "react-query"
import { fetchCurrentUser } from "../api-client"

export const Booking = () => {
    const { data: currentUser } = useQuery(
        'detchCurrentUser',
        fetchCurrentUser
    )

    return (
        <div></div>
    )
}