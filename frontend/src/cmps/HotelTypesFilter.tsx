import { ChangeEvent } from "react"
import { hotelTypes } from "../config/hotel-options-config"

type Props = {
    selectedHotelTypes: string[]
    onChange: (Event: ChangeEvent<HTMLInputElement>) => void
}

export const HotelTypesFilter = ({ selectedHotelTypes, onChange }: Props) => {
    return (
        <div className="border-b border-slate-300 pb-5">
            <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
            {hotelTypes.map((hoteType, idx) => (
                <label key={idx} className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        className="rounded"
                        value={hoteType}
                        checked={selectedHotelTypes.includes(hoteType)}
                        onChange={onChange}
                    />
                    <span>{hoteType}</span>
                </label>
            ))}
        </div>
    )
}