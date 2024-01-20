import { FormProvider, useForm } from "react-hook-form"
import { DetailsSection } from "./DetailsSection"
import { TypesSection } from "./TypesSection"
import { FacilitiesSection } from "./FacilitiesSection"
import { GuestsSection } from "./GuestsSection"
import { ImagesSection } from "./ImagesSection"
import { HotelType } from "../../../../backend/src/shared/types"
import { useEffect } from "react"

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
    imageUrls: string[],
}

type Props = {
    hotel?: HotelType
    onSave: (HotelFormData: FormData) => void
    isLoading: boolean
}

export const ManageHotelForm = ({ hotel, onSave, isLoading }: Props) => {

    const formMethods = useForm<HotelFormData>()
    const { handleSubmit, reset } = formMethods

    useEffect(() => {
        reset(hotel)
    }, [hotel, reset])

    const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
        const formData = new FormData();
        if (hotel) formData.append('hotelId', hotel._id)
        formData.append('name', formDataJson.name)
        formData.append('city', formDataJson.city)
        formData.append('country', formDataJson.country)
        formData.append('description', formDataJson.description)
        formData.append('type', formDataJson.type)
        formData.append('pricePerNight', formDataJson.pricePerNight.toString())
        formData.append('starRating', formDataJson.starRating.toString())
        formData.append('adultCount', formDataJson.adultCount.toString())
        formData.append('childCount', formDataJson.childCount.toString())

        formDataJson.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility)
        })

        if (formDataJson.imageUrls) {
            formDataJson.imageUrls.forEach((url, idx) => {
                formData.append(`imageUrls[${idx}]`, url)
            })
        }

        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append(`imageFiles`, imageFile)
        })

        onSave(formData)
    })

    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                <DetailsSection />
                <TypesSection />
                <FacilitiesSection />
                <GuestsSection />
                <ImagesSection />
                <span className="flex justify-end">
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="rounded bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
                    >
                        {isLoading ? 'Saving...' : 'Save'}
                    </button>
                </span>
            </form>
        </FormProvider>
    )
}