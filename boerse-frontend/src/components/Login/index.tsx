import React, {useState} from "react"
import axios from "axios";


export default function Login() {
    const [benutzername, setBenutzername] = useState("");
    const [passwort, setPasswort] = useState("");

    const hantiereSubmit = () => {
        axios.post(
            "http://localhost:8080/login",
            {
                "benutzername": benutzername,
                "passwort": passwort
            }
        )
        setBenutzername("");
        setPasswort("");

    }

    const hantiereVeraenderungBenutzername = (event: React.FormEvent<HTMLInputElement>) => {
        setBenutzername(event.currentTarget.value);
    }

    const hantiereVeraenderungPasswort = (event: React.FormEvent<HTMLInputElement>) => {
        setPasswort(event.currentTarget.value);

    return (
        <>
            <div>
                <h2>Einloggen</h2>
                <form onSubmit={hantiereSubmit}>
                    <label>
                        Benutzername
                    </label>
                    <input
                        id={"benutzername"}
                        type={"text"}
                        placeholder={"benutzername"}
                        onChange={hantiereVeraenderungBenutzername}
                    />

                    <label>
                        Passwort
                    </label>
                    <input
                        id={"passwort"}
                        type={"password"}
                        placeholder={"passwort"}
                        onChange={hantiereVeraenderungPasswort}/>

                    <button>Sign In</button>
                </form>
                <div>

                </div>
            </div>
        </>
    )
}
