import './App.css'
import HomePage from "@/pages/HomePage";
import {Route, Routes} from "react-router-dom";
//import Layout from "@/components/Layout";
//import MyAssetsPage from "@/pages/MyAssetsPage";
//import AssetPage from "@/pages/TokenPage";
import { ChakraProvider } from '@chakra-ui/react'

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
            </Routes>
        </ChakraProvider>
    )
}
export default App
