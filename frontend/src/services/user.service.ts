import Axios from "axios"
import { RegisterFormData } from "../pages/Register"
import { UserType } from "../../../backend/src/shared/types"
import { SignInFormData } from "../pages/SignIn"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

const axios = Axios.create({ withCredentials: true })

export const fetchCurrentUser = async (): Promise<UserType> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/users/me`)
        return response.data
    } catch (error) {
        throw new Error('Error fetching user')
    }
}

export const signUp = async (formData: RegisterFormData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/users/register`, formData,)
        return response.data
    } catch (error) {
        throw new Error('User already exists')
    }
}

export const signIn = async (formData: SignInFormData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/login`, formData,)
        return response.data
    } catch (error) {
        throw new Error('Invalid credentials')
    }
}

export const validateToken = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/validate-token`)
        return response.data
    } catch (error) {
        throw new Error('Token invalid')
    }
}

export const signOut = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/logout`, null)
        return response.data
    } catch (error) {
        throw new Error('Error during signout')
    }
}
