import { useQuery } from "react-query"
import { useSearchContext } from "../contexts/SearchContext"
import { searchHotels } from "../services/hotel.service"
import { ChangeEvent, useState } from "react"
import { SearchResultsCard } from "../cmps/SearchResultsCard"
import { Pagination } from "../cmps/Pagination"
import { StarRatingFilter } from "../cmps/StarRatingFilter"
import { HotelTypesFilter } from "../cmps/HotelTypesFilter"
import { FacilitiesFilter } from "../cmps/FacilitiesFilter"
import { PriceFilter } from "../cmps/PriceFilter"
import { SortBy } from "../cmps/SortBy"
import { Loader } from "../cmps/Loader"

export const Search = () => {
    const search = useSearchContext()
    const [page, setPage] = useState<number>(1)
    const [selectedStars, setSelectedStars] = useState<string[]>([])
    const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([])
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>()
    const [sortOption, setSortOption] = useState<string>('')
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        stars: selectedStars,
        types: selectedHotelTypes,
        facilities: selectedFacilities,
        maxPrice: selectedPrice?.toString(),
        sortOption,
    }

    const { data: hotelData } = useQuery(['searchHotels', searchParams], () =>
        searchHotels(searchParams)
    )

    const handleStarsChange = (event: ChangeEvent<HTMLInputElement>) => {
        const starRating = event.target.value
        setSelectedStars((prevStars) =>
            event.target.checked
                ? [...prevStars, starRating]
                : prevStars.filter((star) => star !== starRating)
        )
    }

    const handleHotelTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const hotelType = event.target.value
        setSelectedHotelTypes((prevHotelTypes) =>
            event.target.checked
                ? [...prevHotelTypes, hotelType]
                : prevHotelTypes.filter((prevHotelType) => prevHotelType !== hotelType)
        )
    }

    const handleFacilityChange = (event: ChangeEvent<HTMLInputElement>) => {
        const facility = event.target.value
        setSelectedFacilities((prevFavilities) =>
            event.target.checked
                ? [...prevFavilities, facility]
                : prevFavilities.filter((prevFacility) => prevFacility !== facility)
        )
    }

    if (!hotelData) return <Loader />

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit">
                <div className={`${isCollapsed ? 'block' : 'hidden'} flex justify-between lg:hidden`}>
                    <h3 className="text-lg self-center font-semibold ">Filter by:</h3>
                    <button onClick={() => setIsCollapsed(!isCollapsed)} className="rounded bg-blue-600 text-white sm:self-end w-fit px-2 py-1 hover:bg-blue-500" >Show Filter Section</button>
                </div>
                <div className={`space-y-5 ${isCollapsed ? 'hidden' : 'block'} lg:block`}>
                    <div className="flex justify-between border-b border-slate-300 pb-5">
                        <h3 className="text-lg font-semibold ">Filter by:</h3>
                        <button onClick={() => setIsCollapsed(!isCollapsed)} className="rounded bg-blue-600 text-white sm:self-end w-fit px-2 py-1 hover:bg-blue-500 lg:hidden" >Close Filter Options</button>
                    </div>
                    <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange} />
                    <HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypeChange} />
                    <FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleFacilityChange} />
                    <PriceFilter selectedPrice={selectedPrice} onChange={(value?: number) => setSelectedPrice(value)} />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="block justify-between items-center sm:flex">
                    <div className="text-xl font-bold mb-5 sm:mb-0">
                        {hotelData?.pagination.total} Hotels found
                        {search.destination ? ` in ${search.destination}` : ''}
                    </div>
                    <SortBy sortOption={sortOption} setSortOption={setSortOption} />
                </div>
                {hotelData?.data.map((hotel) => (
                    <SearchResultsCard key={hotel._id} hotel={hotel} />
                ))}
                <div>
                    <Pagination
                        page={hotelData?.pagination.page || 1}
                        pages={hotelData?.pagination.pages || 1}
                        onPageChange={(page) => setPage(page)}
                    />
                </div>
            </div>
        </div>
    )
}