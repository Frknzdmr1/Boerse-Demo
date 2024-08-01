"use client";

import Layout from "@/components/Layout";

import TopTokens from "./TopMarken";
import NeuesteAktionen from "./NeuesteAktionen";
import Learnings from "@/pages/HomePage/Learnings";
import Balance from "@/pages/HomePage/Balance";

const HomePage = () => {


    return (
        <Layout title="Dashboard">
            <div className="space-y-2">
                <Balance  userId="1" />


                <div className="flex space-x-2 lg:block lg:space-x-0 lg:space-y-2">
                    <TopTokens />
                </div>
                <div className="flex -mx-1 lg:block lg:mx-0 lg:space-y-2">
                    <NeuesteAktionen/>
                    <Learnings />
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
