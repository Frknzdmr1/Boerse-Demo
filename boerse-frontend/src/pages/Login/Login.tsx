import React, {useState, useContext} from 'react';
import AuthentifizierungsUtils from "@/pages/Login/AuthUtils/AuthentifizierungsUtils";
import {NavLink, useNavigate} from 'react-router-dom';
import {kontext} from "@/pages/Login/AuthUtils/AuthentifizierungsProvider";
import {Card, Flex} from "@chakra-ui/react";
import logo from "../../.././public/images/logo-light.svg"


export type BenutzerDto = {
    userId: string,
    benutzername: string,

}

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {setAktuellerBenutzer} = useContext(kontext);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = await AuthentifizierungsUtils.login(username, password);
            const token = data.accessToken
            let name = ""
            if (AuthentifizierungsUtils.getBenutzernameFromToken(token) !== null) {
                name = AuthentifizierungsUtils.getBenutzernameFromToken(token)!;

            }
            setAktuellerBenutzer!({
                id: AuthentifizierungsUtils.getUserIdFromToken(token)!,
                benutzername: name
            });
            navigate("/", {
                replace: true
            });
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleReqistrierung = () => {
        <NavLink to={"http://localhost:5173/register"}/>
    }

    return (
        <Flex justify="center" align="center" minHeight="100vh">
            <Card width="100%" maxW="sm" p={6} boxShadow="lg">
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img className="mx-auto h-10 w-auto"
                             src={logo} alt=""/>
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Herzlich
                            Willkommen</h2>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="username"
                                       className="block text-sm font-medium leading-6 text-gray-900">Benutzername</label>
                                <div className="mt-2">
                                    <input id="username" name="username" type="text" required
                                           className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                           value={username} onChange={(e) => setUsername(e.target.value)}/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Passwort</label>
                                <div className="mt-2">
                                    <input
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        id="password"
                                        name="password"
                                        type="password"
                                        required value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                            </div>

                            <button type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >Login
                            </button>
                        </form>
                    </div>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Hast du kein Konto?{' '}
                        < button type={"button"}  onClick={handleReqistrierung}
                                 className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Zur
                            Registrierung
                        </button>
                    </p>
                </div>
            </Card>
        </Flex>

    )
        ;
};

export default Login;
