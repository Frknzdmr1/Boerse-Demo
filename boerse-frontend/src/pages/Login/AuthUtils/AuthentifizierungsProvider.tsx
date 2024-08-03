import React, {createContext, useState, useEffect, Dispatch, ReactNode} from "react";
import AuthentifizierungsUtils, {Benutzer} from "@/pages/Login/AuthUtils/AuthentifizierungsUtils";


type KontextTyp = {
    aktuellerBenutzer: Benutzer | null,
    setAktuellerBenutzer: Dispatch<React.SetStateAction<Benutzer>> |null
}

export const kontext = createContext<KontextTyp>({
    aktuellerBenutzer: null,
    setAktuellerBenutzer:  () => {}
})!;

type Props = {
    children: ReactNode
}





export const AuthentifizierungProvider: React.FC<Props> = ({children}) =>{
    const [aktuellerBenutzer, setAktuellerBenutzer] = useState<Benutzer |null>(
        {
            id: "",
            benutzername: ""
        }
    );

    useEffect(() => {
        const benutzerToken = AuthentifizierungsUtils.getCurrentUser()?.accessToken;
        if (benutzerToken) {
            const benutzer = AuthentifizierungsUtils.getAktuellerBenutzer(benutzerToken);
            if (benutzer) {
                setAktuellerBenutzer(benutzer);
            }
        }
    }, []);

    return (
        <kontext.Provider value={{ aktuellerBenutzer, setAktuellerBenutzer }}>
            {children}
        </kontext.Provider>
    );
}
