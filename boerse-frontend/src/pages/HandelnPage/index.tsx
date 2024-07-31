"use client"

import Preise from "@/pages/HandelnPage/Preise";
import Layout from "@/components/Layout";

const HandelnPage = () => {
    return (
        <Layout title="Trade">
            <div className="flex items-start lg:block">
                <div className="card grow">
                    <Preise />
                    <div className="h-0.25 mt-4 -mx-6 bg-theme-stroke"></div>

                </div>

            </div>
        </Layout>
    );
};

export default HandelnPage;