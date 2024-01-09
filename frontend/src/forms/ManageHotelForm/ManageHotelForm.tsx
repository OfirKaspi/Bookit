import { FormProvider, useForm } from "react-hook-form"
import { DetailsSection } from "./DetailsSection"
import { TypesSection } from "./TypesSection"
import { FacilitiesSection } from "./FacilitiesSection"
import { GuestsSection } from "./GuestsSection"

export type HotelFormData = {
    name: string,
    city: string,
    country: string,
    description: string,
    type: string,
    adultCount: number,
    childCount: number,
    facilities: string[],
    pricePerNight: number,
    starRating: number,
    imageFiles: FileList,
}

export const ManageHotelForm = () => {

    const formMethods = useForm<HotelFormData>()

    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10">
                <DetailsSection />
                <TypesSection />
                <FacilitiesSection />
                <GuestsSection />
            </form>
        </FormProvider>
    )
}