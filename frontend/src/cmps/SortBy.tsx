import { ChangeEvent } from "react"

type Props = {
    sortOption: string
    setSortOption: (value: string) => void
}

export const SortBy = ({ sortOption, setSortOption }: Props) => {
    return (
        <select
            value={sortOption}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => setSortOption(event.target.value)}
            className="p-2 border rounded-md"
        >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">Price Per Night (low to high)</option>
            <option value="pricePerNightDesc">Price Per Night (high to low)</option>
        </select>
    )
}