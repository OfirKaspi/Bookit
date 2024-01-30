import DatePicker from "react-datepicker"
import { useForm } from "react-hook-form"
import { useSearchContext } from "../../contexts/SearchContext"
import { useAppContext } from "../../contexts/AppContext"
import { useLocation, useNavigate } from "react-router-dom"
import { BookNowButton } from "../../cmps/BookNowButton"
import { ImManWoman } from "react-icons/im"
import { FaChildren } from "react-icons/fa6"
import { BsCalendarEvent, BsCalendarWeek } from "react-icons/bs"
import { useEffect, useState } from "react"

type Props = {
    hotelId: string
    pricePerNight: number
}

type GuestInfoFormData = {
    checkIn: Date
    checkOut: Date
    adultCount: number
    childCount: number
}

export const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
    const search = useSearchContext()
    const { isLoggedIn } = useAppContext()
    const navigate = useNavigate()
    const location = useLocation()

    const [numberOfNights, setNumberOfNights] = useState<number>(0)

    useEffect(() => {
        if (search.checkIn && search.checkOut) {
            const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
                (1000 * 60 * 60 * 24)
            setNumberOfNights(Math.ceil(nights))
        }
    }, [search.checkIn, search.checkOut])

    const { watch, register, handleSubmit, setValue, formState: { errors } } = useForm<GuestInfoFormData>({
        defaultValues: {
            checkIn: search.checkIn,
            checkOut: search.checkOut,
            adultCount: search.adultCount,
            childCount: search.childCount,
        }
    })

    const checkIn = watch('checkIn')
    const checkOut = watch('checkOut')

    const minDate = new Date()
    const maxDate = new Date()
    maxDate.setFullYear(maxDate.getFullYear() + 1)

    const onSignInClick = (data: GuestInfoFormData) => {
        search.saveSearchValues('', data.checkIn, data.checkOut, data.adultCount, data.childCount)
        navigate('/sign-in', { state: { from: location } })
    }

    const onSubmit = (data: GuestInfoFormData) => {
        search.saveSearchValues('', data.checkIn, data.checkOut, data.adultCount, data.childCount)
        navigate(`/hotel/${hotelId}/booking`, { state: { from: location } })
    }

    const handleButtonClick = () => {
        if (isLoggedIn) {
            handleSubmit(onSubmit)();
        } else {
            onSignInClick({
                checkIn: watch('checkIn'),
                checkOut: watch('checkOut'),
                adultCount: watch('adultCount'),
                childCount: watch('childCount')
            })
        }
    }

    return (
        <div className="flex flex-col p-4 bg-blue-200 gap-4 rounded">
            <div className=" flex flex-col gap-2">
                <h3 className="text-lg font-bold">${pricePerNight * numberOfNights}</h3>
                <div className="flex items-center gap-2">
                    <p>{numberOfNights} nights &#11825;</p>
                    <span className="text-sm text-slate-600">Includes taxes and charges</span>
                </div>
            </div>
            <div>
                <div className="grid grid-cols-1 gap-4 items-center">
                    <div className="flex rounded group bg-white p-2">
                        <BsCalendarEvent size={25} className="mr-2" />
                        <DatePicker
                            required
                            selected={checkIn}
                            onChange={(date) => setValue('checkIn', date as Date)}
                            selectsStart
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText="Check-in Date"
                            className="min-w-full cursor-pointer focus:outline-none"
                            wrapperClassName="w-full"
                        />
                    </div>
                    <div className="flex rounded group bg-white p-2">
                        <BsCalendarWeek size={25} className="mr-2" />
                        <DatePicker
                            required
                            selected={checkOut}
                            onChange={(date) => setValue('checkOut', date as Date)}
                            selectsStart
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText="Check-in Date"
                            className="min-w-full cursor-pointer focus:outline-none"
                            wrapperClassName="w-full"
                        />
                    </div>
                    <div className="flex bg-white px-2 py-1 gap-2 rounded">
                        <label className="items-center flex ">
                            <ImManWoman size={25} className="mr-2 min-w-fit" />
                            <span>Adults:</span>
                            <input
                                className="w-full  p-1 focus:outline-none font-bold"
                                type="number"
                                min={1}
                                max={20}
                                {...register('adultCount', {
                                    required: 'This field is required',
                                    min: {
                                        value: 1,
                                        message: 'There must be at least one adult'
                                    },
                                    valueAsNumber: true
                                })}
                            />
                        </label>
                        <label className="items-center flex">
                            <FaChildren size={25} className="mr-2 min-w-fit" />
                            <span>Children:</span>
                            <input
                                className="w-full p-1 focus:outline-none font-bold"
                                type="number"
                                min={0}
                                max={20}
                                {...register('childCount', { valueAsNumber: true })} />
                        </label>
                        {errors.adultCount && (
                            <span className="text-red-500 font-semibold text-sm">
                                {errors.adultCount.message}
                            </span>
                        )}
                    </div>
                    <BookNowButton onSubmit={handleButtonClick} />
                </div>
            </div>
        </div>
    )
}