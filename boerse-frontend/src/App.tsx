import React, {useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import HomePage from '@/pages/HomePage';
import Aktien from '@/components/Aktien';
import Portfolio from '@/components/Portfolio';
import AktuellesPage from "@/pages/AktuellesPage";
import TokenPage from "@/pages/TokenPage";
import Login from "@/pages/Login/Login";

function App() {
    const [userId, setUserId] = useState<string>("");
    return (
        <ChakraProvider>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/current-price" element={<Aktien />} />
                <Route path="/portfolio" element={<Portfolio userId={userId} />} />
                <Route path="/aktuelles" element={<AktuellesPage />} />
                <Route path="/current-price" element={<Aktien/>}/>
                <Route path="/token/:symbol" index element={<TokenPage/>}/>
                <Route path="/login" element={<Login setUserId={setUserId}/>} />
            </Routes>
        </ChakraProvider>
    );
}

export default App;
