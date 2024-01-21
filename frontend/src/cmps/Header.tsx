import { Link } from "react-router-dom"
import { useAppContext } from "../contexts/AppContext"
import { SignOutButton } from "./SignOutButton"

export const Header = () => {

    const { isLoggedIn } = useAppContext()

    return (
        <div className="bg-blue-800">
            <div className="container p-4 mx-auto flex justify-between">
                <span className="flex items-center text-3xl text-white font-bold tracking-tight">
                    <Link to='/'><img src="https://res.cloudinary.com/dudwjf2pu/image/upload/v1705691035/Bookit.com_jn9ebb.svg" alt="bookit image" className="h-[50px]" /></Link>
                </span>
                <span className="flex items-center space-x-2">
                    {isLoggedIn ? (<>
                        <Link className="flex items-center rounded text-white px-3 font-bold hover:bg-blue-600 h-[40px]" to='/my-bookings'>My Bookings</Link>
                        <Link className="flex items-center rounded text-white px-3 font-bold hover:bg-blue-600 h-[40px]" to='/my-hotels'>My Hotels</Link>
                        <SignOutButton />
                    </>) : (<>
                        <Link className="flex bg-white rounded items-center text-blue-600 px-3 font-bold hover:bg-gray-100 h-[40px]" to='/sign-in'>Sign In</Link>
                    </>)}
                </span>
            </div>
        </div>
    )
} 