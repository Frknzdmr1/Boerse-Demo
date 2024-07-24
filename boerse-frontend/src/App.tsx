import './App.css'
import HomePage from "@/templates/HomePage";
import {Route, Routes} from "react-router-dom";
//import Layout from "@/components/Layout";
import MyAssetsPage from "@/templates/MyAssetsPage";
import AssetPage from "@/templates/TokenPage";
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
                    <Route
                        path="my-assets"
                        element={
                            <div title="My Assets">
                                <MyAssetsPage />
                            </div>
                        }
                    />
                    <Route
                        path="token"
                        element={
                            <div title="Tokens">
                                <AssetPage />
                            </div>
                        }
                    />
                </Route>
            </Routes>
        </ChakraProvider>
    )
}
export default App
