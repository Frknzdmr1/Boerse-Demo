import axios from "axios";
import jwtDecode from "jwt-decode";


export type LoginPost = {
    benutzername: string,
    password: string
}

export type RegisterPost = {
    benutzername: string,
    email: string,
    password: string
}

export type AuthResponse = {
    token: string
}


const API_URL : string = "http://localhost:8080/auth";

const register = (benutzername: string, email: string, password: string)  => {
    return axios.post(
        API_URL + "/register",
        {
            benutzername,
            email,
            password
        }
    )
}

const login = async (benutzername: string, password: string): Promise<AuthResponse> => {
    return axios.post<AuthResponse>(
        API_URL + "/login",
        {
            benutzername,
            password
        })
        .then(response => {
            if(response.data.token){
                localStorage.setItem("user", JSON.stringify(response.data))
            }
            return response.data
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = (): AuthResponse | null => {
    const benutzerStr = localStorage.getItem("user");
    if (benutzerStr) {
        return JSON.parse(benutzerStr);
    }
    return null;
};

const authentifizierungsHeader = () => {
    const benutzer = getCurrentUser();
    if(benutzer && benutzer.token){
        return { Authorization: "Bearer " + benutzer.token}
    } else {
        return {};
    }
};

type JwtPayload = {
    userId: string
    nutzername: string
}
const getUserIdFromToken = (token: string): string | null => {
    try {
        const decodedToken = jwtDecode.jwtDecode<JwtPayload>(token);
        return decodedToken.userId;
    }
    catch (error){
        console.log("Error decoding token", error);
        return null;
    }
}


const getBenutzernameFromToken = (token: string) : string | null => {
    try{
        const decodedToken = jwtDecode.jwtDecode<JwtPayload>(token);
        return decodedToken.nutzername
    } catch (error){
        console.log("Error decoding token", error);
        return null;
    }
}
export default {
    register,
    login,
    logout,
    getCurrentUser,
    authentifizierungsHeader,
    getUserIdFromToken,
    getBenutzernameFromToken
}

