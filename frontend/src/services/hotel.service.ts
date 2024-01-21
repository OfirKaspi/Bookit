import { HotelSearchResponse, HotelType, PaymentIntentResponse } from "../../../backend/src/shared/types"
import { BookingFormData } from "../forms/BookingForm/BookingForm";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

type SearchParams = {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    adultCount?: string;
    childCount?: string;
    page?: string;
    facilities?: string[];
    types?: string[];
    stars?: string[];
    maxPrice?: string;
    sortOption?: string;
};

export const addMyHotel = async (hotelFormData: FormData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/my-hotels`, hotelFormData, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw new Error('Fail to add hotel');
    }
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/my-hotels`, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching hotels');
    }
};

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/my-hotels/${hotelId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching hotel');
    }
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get('hotelId')}`, hotelFormData, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw new Error('Failed to update hotel');
    }
};

export const searchHotels = async (searchParams: SearchParams): Promise<HotelSearchResponse> => {
    try {
        const queryParams = new URLSearchParams();

        // Manually append each parameter to the URLSearchParams
        Object.entries(searchParams).forEach(([key, value]) => {
            if (value !== undefined) {
                if (Array.isArray(value)) {
                    value.forEach((v) => queryParams.append(key, v));
                } else {
                    queryParams.append(key, value);
                }
            }
        });

        const response = await axios.get(`${API_BASE_URL}/api/hotels/search?${queryParams.toString()}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update hotel');
    }
};

export const fetchHotels = async (): Promise<HotelType[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/hotels`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching hotels');
    }
};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/hotels/${hotelId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching hotel');
    }
};

export const createPaymentIntent = async (hotelId: string, numberOfNights: string): Promise<PaymentIntentResponse> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`, { numberOfNights }, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching payment intent');
    }
};

export const createRoomBooking = async (formData: BookingFormData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`, formData, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw new Error('Error booking room');
    }
};

export const fetchMyBookings = async (): Promise<HotelType[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/my-bookings`, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw new Error('Unable to fetch bookings');
    }
};