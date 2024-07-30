import React, { createContext, useState, useEffect} from "react";
import AuthentifizierungsUtils from "@/pages/Login/AuthUtils/AuthentifizierungsUtils";

type Benutzer = {
    benutzername: string,
    password: string
}

type KontextTyp = {
    aktuellerBenutzer: Benutzer | null,
    setAktuellerBenutzer: (benutzer: Benutzer | null) => void
}

export const kontext = createContext<KontextTyp>({
    aktuellerBenutzer: null,
    setAktuellerBenutzer:  () => {}
});

type Props = {
    children: React.ReactNode
}





export const AuthentifizierungProvider = ({children}: Props) =>{
    const [aktuellerBenutzer1, setAktuellerBenutzer1] = useState(AuthentifizierungsUtils.getCurrentUser);

    useEffect(() => {
        const benutzer = AuthentifizierungsUtils.getCurrentUser();
        if(benutzer) {
            setAktuellerBenutzer1(benutzer);
        }
    }, []);


    return (
        <kontext.Provider value={{
            aktuellerBenutzer: aktuellerBenutzer1,
            setAktuellerBenutzer: setAktuellerBenutzer1
        }} >
            {children}
        </kontext.Provider>
    )
}
