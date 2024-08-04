import React, {useState} from "react";
import axios from "axios";


export default function Registrierung() {
    const [passwort, setPasswort ] = useState<string>("");
    const [benutzername, setBenutzername ] = useState<string>("");
    const [passwort2, setPasswort2] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [hatWiederholungsFehler,
        setHatWiederholungsFehler] = useState<boolean>(false);


    const hantiereSubmit = () => {
        if(passwort !== passwort2){
            setHatWiederholungsFehler(true);
        }
        else {
            axios.post(
                "http://localhost:8080/login",
                {
                    "benutzername": benutzername,
                    "passwort": passwort,
                    "email": email
                }
            )
            setBenutzername("");
            setPasswort("");
            setEmail("");
        }
    }
    const hantiereVeraenderungBenutzername = (event: React.FormEvent<HTMLInputElement>) => {
        setBenutzername(event.currentTarget.value);
    }

    const hantiereVeraenderungPasswort = (event: React.FormEvent<HTMLInputElement>) => {
        setPasswort(event.currentTarget.value);
    }

    const hantiereVeraenderungEmail = (event: React.FormEvent<HTMLInputElement>) => {
        setHatWiederholungsFehler(false);
        setEmail(event.currentTarget.value);
    }

    const hantiereVeraenderungPasswort2 = (event: React.FormEvent<HTMLInputElement>) => {
        setHatWiederholungsFehler(false);
        setPasswort2(event.currentTarget.value);
    }


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
                        Email
                    </label>
                    <input id={"email"}
                           type={"email"}
                           placeholder={"example.org"}
                           onChange={hantiereVeraenderungEmail}/>

                    <label>
                        Passwort
                    </label>
                    <input
                        id={"passwort"}
                        type={"password"}
                        placeholder={"passwort"}
                        onChange={hantiereVeraenderungPasswort}/>

                    <label>Passwort bestätigen</label>
                    <input
                       id={"passwort2"}
                       type={"password"}
                       placeholder={"passwort wiederholen"}
                       onChange={hantiereVeraenderungPasswort2}
                    />
                    <button>Sign In</button>
                    {hatWiederholungsFehler && <text style={{
                        color:"red"
                    }}>Die Passwörter stimmen nicht überein</text>}
                </form>
                <div>

                </div>
            </div>
        </>
    );
}
