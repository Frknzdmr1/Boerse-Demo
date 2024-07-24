import React from 'react';
import './App.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';


import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "@/dev";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
                <App />
            </DevSupport>
        </BrowserRouter>
    </React.StrictMode>,
);
