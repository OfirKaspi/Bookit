import { AiFillStar } from "react-icons/ai"
import { HotelType } from "../../../backend/src/shared/types"
import { Link } from "react-router-dom"

type Props = {
    hotel: HotelType
}

export const SearchResultsCard = ({ hotel }: Props) => {
    return (
        <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[200px_1fr] border border-slate-300 rounded-lg p-4 gap-4">
            <div className="sm:h-[200px]">
                <img src={hotel.imageUrls[0]} className="w-full h-full rounded-lg object-cover object-center" />
            </div>
            <div className="grid gap-2 sm:grid-cols-[1fr_150px]">
                <div className="flex flex-col gap-2 justify-between">
                    <div className="flex flex-col sm:gap-2">
                        <div className="flex flex-col self-start items-center sm:gap-1 sm:flex-row">
                            <span className="flex">
                                {Array.from({ length: hotel.starRating }).map(() => (
                                    <AiFillStar className="fill-yellow-400" />
                                ))}
                            </span>
                            <span className="text-md self-start">{hotel.type}</span>
                        </div>
                        <Link to={`/detail/${hotel._id}`} className="text-2xl font-bold text-blue-600 cursor-pointer">{hotel.name}</Link>
                        <div className="hidden sm:line-clamp-4">{hotel.description}</div>
                    </div>
                    <div className="flex gap-2 items-center flex-wrap">
                        {hotel.facilities.slice(0, 3).map((facility, idx) => (
                            <span key={idx} className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                                {facility}
                            </span>
                        ))}
                        <span className="text-md">{hotel.facilities.length > 3 && `+${hotel.facilities.length - 3} more`}</span>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-end sm:justify-start sm:flex-col gap-2 sm:items-end">
                    <div className="h-11 flex gap-2 items-center flex-row-reverse sm:flex-row">
                        <div className="flex flex-col items-start sm:items-end">
                            <span>very good</span>
                            <span>reviews</span>
                        </div>
                        <img className="w-11 h-full" src="http://res.cloudinary.com/dudwjf2pu/image/upload/v1706359003/f2lnmnvce8urml57giqm.png" alt="rating" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <span>${hotel.pricePerNight} per night</span>
                        <Link to={`/detail/${hotel._id}`} className="rounded bg-blue-600 text-white sm:self-end w-fit px-2 py-1 hover:bg-blue-500">View More</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}