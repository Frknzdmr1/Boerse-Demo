import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import HomePage from '@/pages/HomePage';
import Aktien from '@/components/Aktien';
import Portfolio from '@/components/Portfolio';
import AktuellesPage from "@/pages/AktuellesPage";
import TokenPage from "@/pages/TokenPage";
import HandelnPage from "@/pages/HandelnPage";
import EinstellungenPage from "@/pages/EinstellungenPage";
import MyWallet from '@/components/MyWallet';
import Layout from '@/components/Layout'; // Import Layout component
import LearningPage from '@/components/LearningPage';
import Error from "@/components/Error";
import { AuthentifizierungProvider } from "@/pages/Login/AuthUtils/AuthentifizierungsProvider";
import { isLoggedIn } from "@/pages/Login/AuthUtils/AuthentifizierungsUtils";
import Login from "@/pages/Login/Login";
import Registrierung from "@/pages/Registrierung/Registrierung"; // Import Layout component

function App() {
     // Replace with actual user ID

    return (
        <ChakraProvider>
            <AuthentifizierungProvider>
                <Routes>
                    <Route path="/">
                        <Route index element={isLoggedIn() ? <HomePage/> : <Navigate to={"/Login"} />}/>
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registrierung/>} />
                    <Route path="/current-price" element={<Aktien/>}/>
                    <Route path="/portfolio" element={<Portfolio/>}/>
                    <Route path="/aktuelles" element={<AktuellesPage/>}/>
                    <Route path="/current-price" element={<Aktien/>}/>
                    <Route path="/token/:symbol" index element={<TokenPage/>}/>
                    <Route path="/handeln" index element={<HandelnPage/>}/>
                    <Route path="/einstellungen" index element={<EinstellungenPage/>}/>
                    <Route path="/my-assets" element={<Layout title="My Wallet"><MyWallet/></Layout>}/>
                    <Route path="/learnings"
                           element={<Layout title="Learnings"><LearningPage/></Layout>}/> {/* Add this line */}
                    <Route path="*" element={<Error/>}/>
                </Routes>
            </AuthentifizierungProvider>
        </ChakraProvider>
    );
}

export default App;
