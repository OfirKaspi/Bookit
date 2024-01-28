import "react-datepicker/dist/react-datepicker.css"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import DatePicker from "react-datepicker"
import { useSearchContext } from "../contexts/SearchContext"

import { MdTravelExplore } from "react-icons/md"
import { FaChildren } from "react-icons/fa6"
import { ImManWoman } from "react-icons/im"
import { BsCalendarEvent, BsCalendarWeek } from "react-icons/bs"

export const SearchBar = () => {
    const search = useSearchContext()
    const navigate = useNavigate()

    const [destination, setDestination] = useState<string>(search.destination)
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn)
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut)
    const [adultCount, setAdultCount] = useState<number>(search.adultCount)
    const [childCount, setChildCount] = useState<number>(search.childCount)

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        search.saveSearchValues(
            destination,
            checkIn,
            checkOut,
            adultCount,
            childCount
        )
        navigate('/search')
    }

    const minDate = new Date()
    const maxDate = new Date()
    maxDate.setFullYear(maxDate.getFullYear() + 1)

    return (
        <form
            onSubmit={handleSubmit}
            className="-mt-8 p-1 bg-amber-400 rounded shadow-md grid grid-cols-1  2xl:grid-cols-4 gap-1"
        >
            <div className="flex flex-row rounded items-center flex-1 bg-white p-2">
                <MdTravelExplore size={25} className="mr-2" />
                <input
                    placeholder="Where are you going?"
                    className="w-full focus:outline-none"
                    value={destination}
                    onChange={(event) => setDestination(event.target.value)}
                />
            </div>

            <div className="flex bg-amber-400 gap-1">
                <label className="w-1/2 rounded bg-white items-center flex p-2">
                    <ImManWoman size={25} className="mr-2" />
                    <span>Adults:</span>
                    <input
                        className="pl-1 w-10 focus:outline-none font-bold"
                        type="number"
                        min={1}
                        max={20}
                        value={adultCount}
                        onChange={(event) => setAdultCount(parseInt(event.target.value))}
                    />
                </label>
                <label className="w-1/2 rounded bg-white items-center flex p-2">
                    <FaChildren size={25} className="mr-2 min-w-fit" />
                    <span>Children:</span>
                    <input
                        className="pl-1 w-10 focus:outline-none font-bold"
                        type="number"
                        min={0}
                        max={20}
                        value={childCount}
                        onChange={(event) => setChildCount(parseInt(event.target.value))}
                    />
                </label>
            </div>
            <div className="flex gap-1">
                <div className="relative w-1/2 rounded group bg-white p-2">
                    <span className="absolute invisible sm:group-hover:visible right-2 z-10 text-slate-400  min-w-max 2xl:-top-8 2xl:text-white 2xl:left-1/2 transform 2xl:-translate-x-1/2">Check in date</span>
                    <div className="flex">
                        <BsCalendarEvent size={25} className="mr-2" />
                        <DatePicker
                            selected={checkIn}
                            onChange={(date) => setCheckIn(date as Date)}
                            selectsStart
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText="Check-in Date"
                            className="w-full cursor-pointer focus:outline-none"
                            wrapperClassName="w-full"
                        />
                    </div>
                </div>
                <div className="relative w-1/2 rounded group bg-white p-2">
                    <span className="absolute invisible sm:group-hover:visible right-2 z-10 text-slate-400  min-w-max 2xl:-top-8 2xl:text-white 2xl:left-1/2 2xl:transform 2xl:-translate-x-1/2">Check out date</span>
                    <div className="flex">
                        <BsCalendarWeek size={25} className="mr-2" />
                        <DatePicker
                            selected={checkOut}
                            onChange={(date) => setCheckOut(date as Date)}
                            selectsStart
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText="Check-out Date"
                            className="w-full cursor-pointer focus:outline-none"
                            wrapperClassName="w-full"
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-1">
                <button className="w-2/3 rounded bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500">
                    Search
                </button>
                <button className="w-1/3 rounded bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500">
                    Clear
                </button>
            </div>

        </form >
    )
}