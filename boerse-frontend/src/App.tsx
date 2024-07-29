import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import HomePage from '@/pages/HomePage';
import Aktien from '@/components/Aktien';
import Portfolio from '@/components/Portfolio';
import AktuellesPage from "@/pages/AktuellesPage";
import TokenPage from "@/pages/TokenPage";

function App() {
    return (
        <ChakraProvider>
            <Routes>
                <Route path="/">
                    <Route
                        index
                        element={

                            <HomePage />

                        }

                    />

                </Route>
                <Route path="/current-price" element={<Aktien />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/aktuelles" element={<AktuellesPage />} />
                <Route path="/current-price" element={<Aktien/>}/>
                <Route path="/token/:symbol" index element={<TokenPage/>}/>
            </Routes>
        </ChakraProvider>
    );
}

export default App;
