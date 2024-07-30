import axios, {AxiosResponse} from "axios";

export type LoginPost = {
    benutzername: string,
    password: string
}

export type RegisterPost = {
    benutzername: string,
    email: string,
    password: string
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

const login = (benutzername: string, password: string) => {
    return axios.post(
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
}
