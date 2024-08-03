"use client";

import {useState, useEffect} from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import Balance from "./Balance";
import TopTokens from "./TopMarken";
import NeuesteAktionen from "./NeuesteAktionen";

const HomePage = () => {
    const [balance, setBalance] = useState(0); // State für das Guthaben
    const userId = "e02c467e-8586-4768-b84b-78a92d6e5527";

    useEffect(() => {
        const fetchKonto = async (userId) => {
            try {
                const response = await axios.get(`http://localhost:8080/guthaben/${userId}`);
                setBalance(response.data.kontostand);
                console.log("konto",response.data.kontostand);
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };
        fetchKonto(userId);
    }, [userId]);


    return (
        <Layout title="Dashboard">
            <div className="space-y-2">
                <Balance balance={balance}/>
                <div className="flex space-x-2 lg:block lg:space-x-0 lg:space-y-2">
                    <TopTokens/>
                </div>
                <div className="flex -mx-1 lg:block lg:mx-0 lg:space-y-2">
                    <NeuesteAktionen/>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
