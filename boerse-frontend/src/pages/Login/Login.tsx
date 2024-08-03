import React, { useState, useContext } from 'react';
import AuthentifizierungsUtils from "@/pages/Login/AuthUtils/AuthentifizierungsUtils";
import {NavLink, useNavigate} from 'react-router-dom';
import {kontext} from "@/pages/Login/AuthUtils/AuthentifizierungsProvider";


export type BenutzerDto = {
    userId: string,
    benutzername: string ,

}

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { setAktuellerBenutzer } = useContext(kontext);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = await AuthentifizierungsUtils.login(username, password);
            const token = data.accessToken
            let name = ""
            if(AuthentifizierungsUtils.getBenutzernameFromToken(token) !== null){
                name = AuthentifizierungsUtils.getBenutzernameFromToken(token)!;

            }
            setAktuellerBenutzer!({
                id: AuthentifizierungsUtils.getUserIdFromToken(token)!,
                benutzername: name
            });
            navigate("http://localhost:5173/", {
                replace: true
            });
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleReqistrierung = () => {
        <NavLink to={"http://localhost:5173/register"} />
    }

    return (
        <div>
        <form onSubmit={handleLogin}>
            <div>
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
        </form>
           < button type={"button"} onClick={handleReqistrierung}> Zur Reqistrierung </button>
        </div>
    );
};

export default Login;
