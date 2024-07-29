import './App.css'
import HomePage from "@/pages/HomePage";
import {Route, Routes} from "react-router-dom";
//import Layout from "@/components/Layout";
//import MyAssetsPage from "@/pages/MyAssetsPage";
//import AssetPage from "@/pages/TokenPage";
import {ChakraProvider} from '@chakra-ui/react'
import Aktien from "@/components/Aktien";
import AktuellesPage from "@/pages/AktuellesPage";
import Portfolio from '@/components/Portfolio';


function App() {
    return (
        <ChakraProvider>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/current-price" element={<Aktien/>}/>
                <Route path="/portfolio" element={<Portfolio/>}/>
                <Route path="/aktuelles" element={<AktuellesPage/>}/>
            </Routes>
        </ChakraProvider>
    )
}

export default App
