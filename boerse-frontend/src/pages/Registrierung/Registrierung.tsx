import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";



export type BenutzerDto = {
    userId: string,
    benutzername: string,
    email: string,

}

const Registrierung: React.FC = () => {
    const [benutzername, setBenutzername] = useState<string>('');
    const [passwort, setPasswort] = useState<string>('');
    const [passwort2, setPasswort2] = useState<string>('');
    const [email, setEmail ] = useState<string>('');
    const [sindPasswoerterGleich, setSindPasswoerterGleich] = useState<boolean>(true)

    const navigate = useNavigate();

    const handleRegistrierung = async (e: React.FormEvent<HTMLFormElement>) => {
        const baseUrl = "http:/localhost:8080";
        e.preventDefault();
        if(passwort !== passwort2){
            setSindPasswoerterGleich(false);
        }
        try {
            axios.post(
                baseUrl + "/auth/register",
                {
                    benutzername: benutzername,
                    passwort: passwort,
                    email: email
                }
            )
            navigate("/login", {
                replace: true
            });
        } catch (error) {
            console.error('Registrierung fehlgeschlagen:', error);
        }
    };

    const handleOnChangePasswort2 = (event : React.ChangeEvent<HTMLInputElement>) => {
        setSindPasswoerterGleich(true);
        setPasswort2(event.target.value);
    }
    return (
        <form onSubmit={handleRegistrierung}>
            <div>
                <label>Benutzername:</label>
                <input type="text" value={benutzername} onChange={(e) => setBenutzername(e.target.value)}/>
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
                <label>Passwort:</label>
                <input type="password" value={passwort} onChange={(e) => setPasswort(e.target.value)}/>
            </div>
            <div>
                <label>Passwort erneut eingeben:</label>
                <input type="password" value={passwort2} onChange={handleOnChangePasswort2}/>
            </div>
            {!sindPasswoerterGleich ? <span color={"red"}>Passwörter stimmen nicht überein!</span> : <></>  }
            <button type="submit">Login</button>
        </form>
    );
};

export default Registrierung;
