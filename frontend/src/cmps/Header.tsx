import { Link } from "react-router-dom"
import { useAppContext } from "../contexts/AppContext"
import { SignOutButton } from "./SignOutButton"
import { useState } from "react"
import { IoBusinessOutline, IoCalendarOutline, IoEnterOutline, IoHomeOutline, IoLogInOutline, IoPersonAddOutline } from "react-icons/io5";

export const Header = () => {

    const { isLoggedIn } = useAppContext()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="bg-blue-700">
            <div className="container mx-auto flex justify-between items-center p-4">
                <Link to="/">
                    <img src="https://res.cloudinary.com/dudwjf2pu/image/upload/v1705691035/Bookit.com_jn9ebb.svg" alt="bookit image" className="w-[150px]" />
                </Link>
                <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white">
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
                <div className="block container mx-auto rounded px-4 pb-2">
                    <div className="bg-amber-400 rounded p-1">
                        <div className="rounded bg-white p-1">
                            <Link className="transition-all rounded p-2 flex items-center gap-2 hover:bg-gray-100" to="/">
                                <IoHomeOutline className="h-5 w-5" />
                                <span>Home</span>
                            </Link>
                            <Link className="transition-all rounded p-2 flex items-center gap-2 hover:bg-gray-100" to="/my-bookings">
                                <IoCalendarOutline className="h-5 w-5" />
                                <span>My Bookings</span>
                            </Link>
                            <Link className="transition-all rounded p-2 flex items-center gap-2 hover:bg-gray-100" to="/my-hotels">
                                <IoBusinessOutline className="h-5 w-5" />
                                <span>My Hotels</span>
                            </Link>
                            <hr className="my-1" />
                            {isLoggedIn
                                ? (
                                    <SignOutButton isSmallScreen={isOpen} />
                                ) : (
                                    <>
                                        <Link className="transition-all rounded p-2 flex items-center gap-2 hover:bg-gray-100" to="/sign-in">
                                            <IoEnterOutline className="h-5 w-5" />
                                            <span>Sign in</span>
                                        </Link>
                                        <Link className="transition-all rounded p-2 flex items-center gap-2 hover:bg-gray-100" to="/register">
                                            <IoPersonAddOutline className="h-5 w-5" />
                                            <span>Register</span>
                                        </Link>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
} 