// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import HomePage from '@/pages/HomePage';
import Aktien from '@/components/Aktien';
import Portfolio from '@/components/Portfolio';
import AktuellesPage from "@/pages/AktuellesPage";
import TokenPage from "@/pages/TokenPage";
import MyWallet from '@/components/MyWallet';
import Layout from '@/components/Layout'; // Import Layout component

function App() {
    const userId = "YOUR_USER_ID"; // Replace with actual user ID

    return (
        <ChakraProvider>
            <Routes>
                <Route path="/" element={<Layout title="Home"><HomePage /></Layout>} />
                <Route path="/current-price" element={<Layout title="Current Price"><Aktien /></Layout>} />
                <Route path="/portfolio" element={<Layout title="Portfolio"><Portfolio userId={userId} /></Layout>} />
                <Route path="/aktuelles" element={<Layout title="Aktuelles"><AktuellesPage /></Layout>} />
                <Route path="/token/:symbol" element={<Layout title="Token"><TokenPage /></Layout>} />
                <Route path="/my-assets" element={<Layout title="My Wallet"><MyWallet userId={userId} /></Layout>} />
            </Routes>
        </ChakraProvider>
    );
}

export default App;
