import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {ChakraProvider} from '@chakra-ui/react';
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
import Error from "@/components/Error"; // Import Layout component

function App() {
    const userId = "bd159b34-852c-48d6-b64d-78da79e3a9a7"; // Replace with actual user ID

    return (
        <ChakraProvider>
            <Routes>
                <Route path="/">
                    <Route index element={<HomePage/>}/>
                </Route>
                <Route path="/current-price" element={<Aktien/>}/>
                <Route path="/portfolio" element={<Portfolio/>}/>
                <Route path="/aktuelles" element={<AktuellesPage/>}/>
                <Route path="/current-price" element={<Aktien/>}/>
                <Route path="/token/:symbol" index element={<TokenPage/>}/>
                <Route path="/handeln" index element={<HandelnPage/>}/>
                <Route path="/einstellungen" index element={<EinstellungenPage/>}/>
                <Route path="/my-assets" element={<Layout title="My Wallet"><MyWallet userId={userId}/></Layout>}/>
                <Route path="/learnings"
                       element={<Layout title="Learnings"><LearningPage/></Layout>}/> {/* Add this line */}
                <Route path="*" element={<Error/>}/>
            </Routes>
        </ChakraProvider>
    );
}

export default App;
