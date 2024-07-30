import React from 'react';
import {Route, Router, Routes} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import HomePage from '@/pages/HomePage';
import Aktien from '@/components/Aktien';
import Portfolio from '@/components/Portfolio';
import AktuellesPage from "@/pages/AktuellesPage";
import TokenPage from "@/pages/TokenPage";
import Login from "@/pages/Login/Login";
import {AuthProvider} from "@/pages/Login/AuthUtils/AuthProvider";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";

function App() {
    return (
        <ChakraProvider>
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route path="/login" element={<Login />}/>
                        <PrivateRoute path="/" element={<HomePage />} />
                        <PrivateRoute path="/current-price" element={<Aktien />} />
                        <PrivateRoute path="/portfolio" element={<Portfolio />} />
                        <PrivateRoute path="/aktuelles" element={<AktuellesPage />} />
                        <PrivateRoute path="/current-price" element={<Aktien/>}/>
                        <PrivateRoute path="/token/:symbol" element={<TokenPage/>}/>
                    </Routes>
                </AuthProvider>
           </Router>
        </ChakraProvider>
    );
}

export default App;
