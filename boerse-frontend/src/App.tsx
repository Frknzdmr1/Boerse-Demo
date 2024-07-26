import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import HomePage from '@/pages/HomePage';
import Aktien from '@/components/Aktien';
import Portfolio from '@/components/Portfolio';

function App() {
    return (
        <ChakraProvider>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/current-price" element={<Aktien />} />
                <Route path="/portfolio" element={<Portfolio />} />
            </Routes>
        </ChakraProvider>
    );
}

export default App;
