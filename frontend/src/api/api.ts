import axios from "axios";

const API_URL = "http://localhost:8080/api";

interface UserData {
    username: string;
    password: string;
    email?: string;
}

// Signup request
export const signup = async (userData: UserData): Promise<any> => {
    return await axios.post(`${API_URL}/auth/signup`, userData);
};

// Login request
export const login = async (userData: UserData): Promise<any> => {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    if (response.data.token) {
        localStorage.setItem("fintrack", JSON.stringify({
            token: response.data.token,
            isLoggedIn: true,
            email: response.data.email,
        })); // Store the token and user data
        // console.log("Token stored:", response.data.token); // Log the token
    } else {
        console.error("No token received from the backend");
    }
    return response;
};

// Fetch user profile
export const fetchProfile = async (): Promise<any> => {
    const userData = JSON.parse(localStorage.getItem("fintrack") || "{}"); // Retrieve user data
    const token = userData.token; // Extract the token

    return await axios.get(`${API_URL}/user/profile`, {
        params: { email: userData.email }, // Pass email as a query parameter
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

