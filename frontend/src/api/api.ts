import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

interface UserData {
    username: string;
    password: string;
    email?: string;
}

// Signup request
export const signup = async (userData: UserData): Promise<any> => {
    return await axios.post(`${API_URL}/signup`, userData);
};

// Login request
export const login = async (userData: UserData): Promise<any> => {
    return await axios.post(`${API_URL}/login`, userData);
};