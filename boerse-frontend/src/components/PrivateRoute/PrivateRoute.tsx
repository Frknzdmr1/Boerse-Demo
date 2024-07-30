import React, {useContext} from "react";
import {Route, RedirectFunction} from "react-router-dom";
import {AuthContext} from "@/pages/Login/AuthUtils/AuthProvider";


const PrivateRoute: React.FC<{ element: React.ReactElement, path: string}> = (
    {element: Component, path, ...rest }) => {
    const authContext = useContext(AuthContext);


    return (
        <Route
            {...rest}
            render = {(props) =>
                authContext?.aktuellerBenuzer ? (
                    <Component {...props} />
                ):(
                    <Route path={"http://localhost:5173/login"} />

    )
            }
            />
    );
}


export default PrivateRoute
