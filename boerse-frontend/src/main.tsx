import React from 'react';
import './App.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';


import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "@/dev";
import {Auth0Provider} from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById('root')!).render(

    <React.StrictMode>
        <BrowserRouter>
            <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
                <Auth0Provider
                    domain="dev-0nw4i4ttloarbpfm.us.auth0.com"
                    clientId="3Up4WKq89lld6SqmHBPtYPHBkoNWUkas"
                    authorizationParams={{
                        redirect_uri: window.location.origin
                    }}
                >
                    <App />
                </Auth0Provider>
            </DevSupport>
        </BrowserRouter>
    </React.StrictMode>

);
