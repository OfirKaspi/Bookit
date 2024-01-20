import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { HotelSearchResponse, HotelType, PaymentIntentResponse, UserType } from "../../backend/src/shared/types"
import { BookingFormData } from "./forms/BookingForm/BookingForm";
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

export const fetchCurrentUser = async (): Promise<UserType> => {
    const response = await axios.get(`${API_BASE_URL}/api/users/me`, { withCredentials: true });
    return response.data;
};

export const register = async (formData: RegisterFormData) => {
    const response = await axios.post(`${API_BASE_URL}/api/users/register`, formData, { withCredentials: true });
    return response.data;
};

export const signIn = async (formData: SignInFormData) => {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, formData, { withCredentials: true });
    return response.data;
};

export const validateToken = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/auth/validate-token`, { withCredentials: true });
    return response.data;
};

export const signOut = async () => {
    const response = await axios.post(`${API_BASE_URL}/api/auth/logout`, null, { withCredentials: true });
    return response.data;
};

export const addMyHotel = async (hotelFormData: FormData) => {
    const response = await axios.post(`${API_BASE_URL}/api/my-hotels`, hotelFormData, { withCredentials: true });
    return response.data;
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
    const response = await axios.get(`${API_BASE_URL}/api/my-hotels`, { withCredentials: true });
    return response.data;
};

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await axios.get(`${API_BASE_URL}/api/my-hotels/${hotelId}`, { withCredentials: true });
    return response.data;
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
    const response = await axios.put(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get('hotelId')}`, hotelFormData, { withCredentials: true });
    return response.data;
};

export const searchHotels = async (searchParams: SearchParams): Promise<HotelSearchResponse> => {
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
};

export const fetchHotels = async (): Promise<HotelType[]> => {
    const response = await axios.get(`${API_BASE_URL}/api/hotels`);
    return response.data;
};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await axios.get(`${API_BASE_URL}/api/hotels/${hotelId}`);
    return response.data;
};

export const createPaymentIntent = async (hotelId: string, numberOfNights: string): Promise<PaymentIntentResponse> => {
    const response = await axios.post(`${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`, { numberOfNights }, { withCredentials: true });
    return response.data;
};

export const createRoomBooking = async (formData: BookingFormData) => {
    const response = await axios.post(`${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`, formData, { withCredentials: true });
    return response.data;
};

export const fetchMyBookings = async (): Promise<HotelType[]> => {
    const response = await axios.get(`${API_BASE_URL}/api/my-bookings`, { withCredentials: true });
    return response.data;
};