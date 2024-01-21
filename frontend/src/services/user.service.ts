import Axios from "axios";
import { RegisterFormData } from "../pages/Register";
import { UserType } from "../../../backend/src/shared/types";
import { SignInFormData } from "../pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const fetchCurrentUser = async (): Promise<UserType> => {
    try {
        const response = await Axios.get(`${API_BASE_URL}/api/users/me`, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching user');
    }
};

export const signUp = async (formData: RegisterFormData) => {
    try {
        const response = await Axios.post(`${API_BASE_URL}/api/users/register`, formData, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw new Error('User already exists');
    }
};

export const signIn = async (formData: SignInFormData) => {
    try {
        const response = await Axios.post(`${API_BASE_URL}/api/auth/login`, formData, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw new Error('Invalid credentials');
    }
};

export const validateToken = async () => {
    try {
        const response = await Axios.get(`${API_BASE_URL}/api/auth/validate-token`, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw new Error('Token invalid');
    }
};

export const signOut = async () => {
    try {
        const response = await Axios.post(`${API_BASE_URL}/api/auth/logout`, null, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw new Error('Error during signout');
    }
};
