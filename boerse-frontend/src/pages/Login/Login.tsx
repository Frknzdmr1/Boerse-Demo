import React, { useState, useContext } from 'react';
import AuthentifizierungsUtils from "@/pages/Login/AuthUtils/AuthentifizierungsUtils";
import { useHistory } from 'react-router-dom';
import {kontext} from "@/pages/Login/AuthUtils/AuthentifizierungProvider";


type LoginProps = {
    setUserId: (id: string) => void;
}
export type BenutzerDto = {
    userId: string,
    benutzername: string ,

}

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { setAktuellerBenutzer } = useContext(kontext);
    const history = useHistory();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = await AuthentifizierungsUtils.login(username, password);
            const token = data.token
            const name = AuthentifizierungsUtils.getBenutzernameFromToken(token);
            setAktuellerBenutzer({
                benutzername: name ,
                password: null
            });
            history.push('/');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
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
    );
};

export default Login;
