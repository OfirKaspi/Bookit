import { useAppContext } from "../contexts/AppContext"

export const BookNowButton = () => {

    const { isLoggedIn } = useAppContext()

    if (!isLoggedIn) return <button className="rounded bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">Sign in to Book </button>

    return <button className="rounded bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">Book Now</button>

}