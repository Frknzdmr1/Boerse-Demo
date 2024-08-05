import axios from "axios";
import { jwtDecode } from "jwt-decode";



export type Benutzer = {
    id: string,
    benutzername: string
}

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
    accessToken: string
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
    console.log(benutzername);
    console.log(password);


    return axios.post<AuthResponse>(
        API_URL + "/login",
        {
            benutzername,
            password
        })
        .then(response => {
            console.log(response.data)
            if(response.data){
                localStorage.setItem("user-token", JSON.stringify(response.data))
            }
            return response.data
        });
};

export function isLoggedIn() {
    const token = localStorage.getItem('user-token');
    if (token) {

        try {

            const decoded = jwtDecode(token);
            return decoded.exp!> Date.now() / 1000; // Überprüfung, ob das Token noch gültig ist
        } catch (error) {
            console.error('Invalid token:', error);
            return false;
        }
    }
    return false;
}

const logout = () => {
    localStorage.removeItem("user-token");
};

const getAktuelleAuthResponse = (): AuthResponse | null => {
    const benutzerStr = localStorage.getItem("user-token");
    if (benutzerStr) {
        console.log(JSON.parse(benutzerStr).accessToken);
        return JSON.parse(benutzerStr);
    }
    return null;
};

const getAktuellerBenutzer = (token: string): Benutzer | null => {

    const benutzername = getBenutzernameFromToken(token);
    const userId = getUserIdFromToken(token);
    if(userId && benutzername){
        return {
            id: userId,
            benutzername: benutzername
        }

    } else {
        return null;
    }
}

const authentifizierungsHeader = () => {
    const benutzer = getAktuelleAuthResponse();
    if(benutzer && benutzer.accessToken){
        return { Authorization: "Bearer " + benutzer.accessToken}
    } else {
        return {};
    }
};

type JwtPayload = {
    userId: string
    nutzername: string
    portfolioId: string
}
const getUserIdFromToken = (token: string): string | null => {
    try {

        const decodedToken = jwtDecode<JwtPayload>(token);
        return decodedToken.userId;
    }
    catch (error){
        console.log("Error decoding token", error);
        return null;
    }
}

export const getDecodedHeader = (): string |null => {
    const token = localStorage.getItem("user-token");
    if(!token){
        console.error("User Token ist nicht vorhanden");
        return null;
    }
    const data = JSON.parse(token)
    return atob(data.accessToken.split('.')[0]);
}

export const getUserId = () => {
    const token = localStorage.getItem("user-token");
    if(!token){
        console.error("User Token ist nicht vorhanden");
        return null
    }
    return getUserIdFromToken(token);
}

export const getAccessToken = () => {
    const token = localStorage.getItem("user-token");
    if(!token){
        alert("AuthToken is empty!")
        return null;
    }
    const data = JSON.parse(token);
    console.log(data.accessToken)
    return data.accessToken;

}
export const getPortfolioId = () => {
    const token = localStorage.getItem("user-token");
    if(!token){
        alert("AuthToken is empty!")
        return null;
    }
    const decodedToken = jwtDecode<JwtPayload>(token);
    return decodedToken.portfolioId;
}

const getBenutzernameFromToken = (token: string) : string | null => {
    try{
        const decodedToken = jwtDecode<JwtPayload>(token);
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
    getCurrentUser: getAktuelleAuthResponse,
    getAktuelleAuthResponse,
    authentifizierungsHeader,
    getUserIdFromToken,
    getBenutzernameFromToken,
    getAktuellerBenutzer,
    isLoggedIn,
    getDecodedHeader,
    getUserId,
    getPortfolioId
}

