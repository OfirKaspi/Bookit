import { Link } from "react-router-dom"
import { useAppContext } from "../contexts/AppContext"
import { SignOutButton } from "./SignOutButton"
import { useState } from "react"
import { VscAccount } from "react-icons/vsc";


export const Header = () => {

    const { isLoggedIn } = useAppContext()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="bg-blue-700">
            <div className="container mx-auto flex justify-between items-center p-4">
                <Link to="/">
                    <img src="https://res.cloudinary.com/dudwjf2pu/image/upload/v1705691035/Bookit.com_jn9ebb.svg" alt="bookit image" className="w-[150px]" />
                </Link>
                <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-blue-500">
                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
                <div className="hidden lg:flex">
                    <ul className="lg:flex gap-1">
                        <li><Link className="rounded text-white px-2 py-1 transition-all hover:bg-blue-600" to="/">Home</Link></li>
                        <li><Link className="rounded text-white px-2 py-1 transition-all hover:bg-blue-600" to="/my-bookings">My Bookings</Link></li>
                        <li><Link className="rounded text-white px-2 py-1 transition-all hover:bg-blue-600" to="/my-hotels">My Hotels</Link></li>
                    </ul>
                </div>
                <div className="min-w-[150px] hidden lg:flex justify-end gap-2">
                    {isLoggedIn
                        ? (
                            <SignOutButton isSmallScreen={isOpen} />
                        ) : (
                            <>
                                <Link to="/sign-in" className="w-fit rounded bg-white font-medium text-blue-600 px-2 py-1 transition-all hover:bg-gray-100 hover:text-blue-900">Sign in</Link>
                                <Link to="/register" className="w-fit rounded bg-white font-medium text-blue-600 px-2 py-1 transition-all hover:bg-gray-100 hover:text-blue-900">Register</Link>
                            </>
                        )
                    }
                </div>
            </div>
            {isOpen &&
                <div className="block bg-white">
                    <ul className="container p-4 mx-auto">
                        <li><Link className="text-blue-600 block rounded p-2 hover:bg-gray-100 " to="/">Home</Link></li>
                        <li><Link className="text-blue-600 block rounded p-2 hover:bg-gray-100" to="/my-bookings">My Bookings</Link></li>
                        <li><Link className="text-blue-600 block rounded p-2 hover:bg-gray-100" to="/my-hotels">My Hotels</Link></li>
                        <hr className="my-1" />
                        {isLoggedIn
                            ? (
                                <li><SignOutButton isSmallScreen={isOpen} /></li>
                            ) : (
                                <>
                                    <li><Link className="text-blue-600 block rounded p-2 hover:bg-gray-100" to="/sign-in">Sign in</Link></li>
                                    <li><Link className="text-blue-600 block rounded p-2 hover:bg-gray-100" to="/register">Register</Link></li>
                                </>
                            )
                        }
                    </ul>
                </div>
            }
        </div>
    )
} 