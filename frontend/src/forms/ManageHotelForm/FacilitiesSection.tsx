import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"
import { hotelFacilities } from "../../config/hotel-options-config"

export const FacilitiesSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>()

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Facilities</h2>
            <div className="flex gap-2 flex-wrap">
                {hotelFacilities.map((facility, idx) => (
                    <label key={idx} className="text-sm flex p-1 gap-2 text-gray-700">
                        <input
                            type="checkbox"
                            value={facility}
                            {...register('facilities', {
                                validate: (facilities) => {
                                    if (facilities && facilities.length > 0) return true
                                    return 'At least one facility in required'
                                }
                            })}
                        />
                        {facility}
                    </label>
                ))}
            </div>
            {errors.facilities && (<span className="text-red-500 text-sm font-bold">{errors.facilities.message}</span>)}
        </div>
    )
}