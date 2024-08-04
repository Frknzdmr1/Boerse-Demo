import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {Card, Flex} from "@chakra-ui/react";
import logo from "../../../public/images/logo-light.svg";


export type BenutzerDto = {
    userId: string,
    benutzername: string,
    email: string,

}

const Registrierung: React.FC = () => {
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
            console.error('Registrierung fehlgeschlagen:', error);
        }
    };

    const handleOnChangePasswort2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSindPasswoerterGleich(true);
        setPasswort2(event.target.value);
    }
    return (
        <Flex justify="center" align="center" minHeight="100vh">
            <Card width="100%" maxW="sm" p={6} boxShadow="lg">
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img className="mx-auto h-10 w-auto" src={logo} alt="Logo"/>
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Herzlich
                            Willkommen</h2>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleRegistrierung}>
                            <div>
                                <label
                                    className="block text-sm font-medium leading-6 text-gray-900">Benutzername:</label>
                                <div className="mt-2">
                                    <input id="username" name="username" type="text" required
                                           className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                           value={benutzername}
                                           onChange={(e) => setBenutzername(e.target.value)}/>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Email:</label>
                                <div className="mt-2">
                                    <input
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        id="email" name="email" type="email" required value={email}
                                        onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Passwort:</label>
                                <div className="mt-2">
                                    <input
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        type="password" required value={passwort}
                                        onChange={(e) => setPasswort(e.target.value)}/>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Passwort erneut
                                    eingeben:</label>
                                <div className="mt-2">
                                    <input
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required type="password" value={passwort2} onChange={handleOnChangePasswort2}/>
                                </div>
                            </div>
                            {!sindPasswoerterGleich &&
                                <span style={{color: "red"}}>Passwörter stimmen nicht überein!</span>
                            }
                            <button type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >Registrieren
                            </button>
                        </form>
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Hast du schon ein Konto?{' '}
                            <button type="button"
                                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                                    onClick={handleRegistrierung}>Login
                            </button>
                        </p>
                    </div>
                </div>
            </Card>
        </Flex>
    )
        ;
};

export default Registrierung;
