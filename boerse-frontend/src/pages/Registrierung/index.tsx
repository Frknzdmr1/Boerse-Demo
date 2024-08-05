import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import { useColorMode } from "@chakra-ui/react";
import {Link} from "react-router-dom";
import Login from "@/components/Login";
import Field from "@/components/Field";

export type BenutzerDto = {
    userId: string,
    benutzername: string,
    email: string,

}
const RegistrierungPage: React.FC = () => {
    const { colorMode, setColorMode } = useColorMode();
    const [benutzername, setBenutzername] = useState<string>('');
    const [passwort, setPasswort] = useState<string>('');
    const [passwort2, setPasswort2] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [sindPasswoerterGleich, setSindPasswoerterGleich] = useState<boolean>(true)

    const navigate = useNavigate();

    const handleRegistrierung = async (e: React.FormEvent<HTMLFormElement>) => {
        const baseUrl = "http://localhost:8080";
        e.preventDefault();
        if (passwort !== passwort2) {
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
            navigate("/Login", {
                replace: true
            });
        } catch (error) {
            console.error('Index fehlgeschlagen:', error);
        }
    };

    const handleOnChangePasswort2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSindPasswoerterGleich(true);
        setPasswort2(event.target.value);
    }
    return (



    <Login
        title="Die Zukunft des Handelns"
        description="Verschaffen Sie sich mit den intelligenten Analysen von FRET Trader einen Vorteil bei Ihrem Online-Handel."
        image="/images/login-img.jpg"
    >
        <div className="mb-5 text-base-2">Registrieren Sie sich mit den folgenden Methoden an:</div>
        <div className="flex mb-8 pb-8 border-b-2 border-theme-stroke space-x-2">
            {!sindPasswoerterGleich &&
                <span style={{color: "red"}}>Passwörter stimmen nicht überein!</span>
            }
        </div>

        <form className="space-y-6" onSubmit={handleRegistrierung}>
            <Field
                className="mb-3"
                id="username"
                placeholder="Geben Sie einen Benutzernamen an"

                type="text"
                value={benutzername}
                onChange={(e) => setBenutzername(e.target.value)}
                required
            />
            <Field
                className="mb-3"
                id="email"
                placeholder="Geben Sie ein Passwort ein"
                icon="envelope"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Field
                className="mb-3"
                placeholder="Geben Sie ein Passwort ein"
                icon="password"
                type="password"
                value={passwort}
                onChange={(e) => setPasswort(e.target.value)}
                required
            />
            <Field
                className="mb-3"
                placeholder="Wiederholen Sie Ihr Passwort"
                icon="password"
                type="password"
                value={passwort2}
                onChange={handleOnChangePasswort2}
                required
            />



            <button type="submit"
                    className="btn-primary w-full mb-3"
            >Jetzt registrieren
            </button>

            <div className="text-caption-1 text-theme-secondary">
                Mit der Anmeldung erklären Sie sich mit den{" "}
                <Link
                    className="text-theme-primary transition-colors hover:text-primary-1"
                    to="/"
                >
                    Nutzungsbedingungen einverstanden
                </Link>
                ,{" "}
                <Link
                    className="text-theme-primary transition-colors hover:text-primary-1"
                    to="/"
                >
                    Datenschutz
                </Link>
                , and{" "}
                <Link
                    className="text-theme-primary transition-colors hover:text-primary-1"
                    to="/"
                >
                    Cookies
                </Link>
                .
            </div>
        </form>
    </Login>
    )
        ;
};

export default RegistrierungPage;
