import React, {useState, useContext} from 'react';
import AuthentifizierungsUtils from "@/pages/Login/AuthUtils/AuthentifizierungsUtils";
import {NavLink, useNavigate} from 'react-router-dom';
import {kontext} from "@/pages/Login/AuthUtils/AuthentifizierungsProvider";
//import {Card, Flex} from "@chakra-ui/react";
//import logo from "../../.././public/images/logo-light.svg"
import Field from "@/components/Field";
import {useColorMode} from "@chakra-ui/react";
import Login from "@/components/Login";

export type BenutzerDto = {
    userId: string,
    benutzername: string,

}

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {setAktuellerBenutzer} = useContext(kontext);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = await AuthentifizierungsUtils.login(username, password);
            const token = data.accessToken;
            let name = "";
            if (AuthentifizierungsUtils.getBenutzernameFromToken(token) !== null) {
                name = AuthentifizierungsUtils.getBenutzernameFromToken(token)!;
            }
            await setAktuellerBenutzer!({
                userId: AuthentifizierungsUtils.getUserIdFromToken(token)!,
                benutzername: name
            });
            window.location.href = "http://localhost:5173"
        } catch (error) {
            console.error('Login fehlgeschlagen:', error);

        }
    };

    const handleReqistrierung = () => {
        <NavLink to={"http://localhost:5173/register"}/>
    }


    const {colorMode, setColorMode} = useColorMode();
    return (


        <Login title="Anmelden" image="/images/login-img.jpg" signIn>
            <div className="mb-5 text-base-2">Melden Sie sich mit den folgenden Methoden an:</div>

            <form className="space-y-2" onSubmit={handleLogin}>
                <Field
                    className="mb-3"
                    placeholder="Bitte geben Sie Ihren Benutzernamen ein"
                    icon="person"
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />


                <Field
                    className="mb-3"
                    placeholder="Geben Sie Ihr Passwort ein"
                    icon="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="btn-primary w-full mb-3">Jetzt handeln</button>
            </form>

        </Login>

    )
        ;
};

export default LoginPage;
